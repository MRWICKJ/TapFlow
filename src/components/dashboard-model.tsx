"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { ArrowDown, ArrowUp, SendHorizonal } from "lucide-react";
import Link from "next/link";

interface Transaction {
  id: string;
  amount: number;
  createdAt: string;
  description: string;
}

interface Account {
  id: string;
  balance: number;
  active: boolean;
}

interface Profile {
  user_id: string;
  first_name: string;
  last_name: string;
  email_id: string;
  username: string;
  account: Account[];
  payerTransactions: Transaction[];
  receiverTransactions: Transaction[];
}

export default function DashboardModel({ profile }: { profile: Profile }) {
  const [fullProfile, setFullProfile] = useState<Profile | null>(null);
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // const [fullUserList, setFullUserList] = useState<Profile[]>([]); // Store all users
  const [filteredUserList, setFilteredUserList] = useState<Profile[]>([]); // Store filtered users
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  async function searchUsers() {
    if (!searchQuery.trim()) {
      toast({
        title: "Warning",
        description: "Please enter a valid search query.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/user/findAll`);
      const results = await response.json();

      // setFullUserList(results); // Store all users
      filterUsers(results); // Filter users based on the search query
    } catch {
      toast({
        title: "Error",
        description: "Unable to fetch users.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const filterUsers = (users: Profile[]) => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.user_id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUserList(filtered); // Update filtered list
  };

  useEffect(() => {
    async function fetchAccountDetails() {
      setLoading(true);
      try {
        const response = await fetch(`/api/user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: profile.user_id }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch account details.");
        }

        const data = await response.json();
        setFullProfile(data.user);
        console.log(data.user);
      } catch (error) {
        toast({
          title: "Error",
          description: `${error}`,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchAccountDetails();
  }, [profile.user_id, toast]);

  const visibleBalance = useMemo(
    () =>
      (balanceVisible && fullProfile?.account[0]?.balance?.toFixed(2)) ||
      "0.00",
    [balanceVisible, fullProfile]
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-6 space-y-10">
      <section className="w-full max-w-4xl space-y-6">
        {/* Profile Section */}
        <Card className="theme-card">
          <CardHeader>
            <CardTitle>
              Welcome, {profile.first_name} {profile.last_name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>User ID:</Label>
              <p>{profile.user_id}</p>
            </div>
            <div>
              <Label>Email:</Label>
              <p>{profile.email_id}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="balanceVisibility"
                checked={balanceVisible}
                onCheckedChange={setBalanceVisible}
              />
              <Label htmlFor="balanceVisibility">
                {balanceVisible ? "Hide Balance" : "Show Balance"}
              </Label>
            </div>
            {balanceVisible ? (
              <div>
                <Label>Account Balance:</Label>
                <p className="text-indigo-600 text-xl">$ {visibleBalance}</p>
              </div>
            ) : (
              <div>
                <Label>Account Balance:</Label>
                <p className="text-indigo-600 text-xl">****</p>
              </div>
            )}
          </CardContent>
        </Card>
        {/* Transactions Section */}
        <Card className="theme-card">
          <CardHeader>
            <CardTitle>Your Latest Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-64 overflow-y-auto space-y-4">
              {fullProfile?.payerTransactions?.length ||
              fullProfile?.receiverTransactions?.length ? (
                [
                  ...(fullProfile?.payerTransactions || []),
                  ...(fullProfile?.receiverTransactions || []),
                ]
                  .sort(
                    (a, b) =>
                      new Date(b?.createdAt).getTime() -
                      new Date(a?.createdAt).getTime()
                  ) // Sort by most recent
                  .map((tx, index) => {
                    const isPayer =
                      fullProfile?.payerTransactions?.includes(tx);
                    return (
                      <div
                        key={tx.id || index}
                        className="p-2 border rounded-md flex flex-col space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <p
                            className={`font-medium ${
                              isPayer ? "text-red-400" : "text-green-400"
                            }`}
                          >
                            {isPayer ? (
                              <ArrowDown className="text-sm text-red-400 inline-block" />
                            ) : (
                              <ArrowUp className="text-sm text-green-400 inline-block" />
                            )}
                            Amount: ${tx.amount}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(tx.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {tx.description || "No description provided."}
                        </p>
                      </div>
                    );
                  })
              ) : (
                <p className="text-muted-foreground">No transactions found.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Search Section */}
        <Card className="theme-card">
          <CardHeader>
            <CardTitle>Find Other Users</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search by username or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button onClick={searchUsers} disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
            <div className="space-y-4">
              {filteredUserList.length ? (
                filteredUserList.map((user) => (
                  <div
                    key={user.user_id}
                    className="p-4 border rounded-md flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">
                        {user.first_name} {user.last_name} ({user.username})
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.email_id}
                      </p>
                    </div>
                    <Link href={`/dashboard/${user.user_id}`}>
                      <Button>
                        <SendHorizonal />
                        Send Money
                      </Button>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No users found.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
