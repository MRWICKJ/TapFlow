"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast"; // Custom hook for toast notifications (assumed)
import { useUser } from '@clerk/nextjs';
import { useRouter } from "next/navigation"; // Use this for client-side navigation

export default function MoneySendingPage({ receiverId }: { receiverId: string }) {
  const { user } = useUser();
  const router = useRouter(); // Router instance for navigation
  const senderId = user?.id;
  const [creceiverId, setCReceiverId] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { toast } = useToast(); // Toast for notifications

  // Fetch the receiver's ID from params
  useEffect(() => {
    const fetchReceiver = async () => {
      setCReceiverId(receiverId);
    };
    fetchReceiver();
  }, [receiverId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !receiverId || !senderId) {
      toast({ title: "Error", description: "Please fill in all fields." });
      return;
    }

    try {
      // Call API to create a transaction
      const response = await fetch('/api/transaction/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: senderId,
          receiverId: receiverId,
          amount: parseFloat(amount),
        }),
      });

      if (!response.ok) {
        throw new Error('Transaction failed');
      }

      const data = await response.json();

      // Show success toast
      toast({ title: "Money Sent", description: `Successfully sent $${amount} to ${receiverId}` });

      if (data) {
        router.push(`/dashboard`); // Client-side navigation
      }
    } catch (error) {
      toast({ title: `Error: ${error}`, description: "Something went wrong, please try again." });
    }
  };

  if (!user) return <div>Loading...</div>; // User must be logged in to access the page
  if (!receiverId) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center max-h-screen bg-background text-primary pt-32">
      <Card className="max-w-md p-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Send Money
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="receiver" className="block mb-2">Receiver</Label>
              <Input id="receiver" value={creceiverId ?? ''} disabled className="text-center" />
            </div>

            <div>
              <Label htmlFor="amount" className="block mb-2">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch checked={isConfirmed} onCheckedChange={setIsConfirmed} />
              <span>Confirm payment</span>
            </div>

            <Button type="submit" disabled={!isConfirmed} className="w-full">Send Money</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
