"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "./ui/checkbox";

interface PageProps {
  user_id: string;
  first_name: string;
  last_name: string;
  username: string;
  email_id: string;
}

export default function Setup({
  user_id,
  first_name,
  last_name,
  username,
  email_id,
}: PageProps) {
  const [newUsername, setNewUsername] = useState<string>(username);
  const [amount, setAmount] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(true); // Add state for account status
  const { toast } = useToast();

  // Zod schema for validation
  const createUserSchema = z.object({
    user_id: z.string().nonempty("User ID is required"),
    first_name: z.string().nonempty("First Name is required"),
    last_name: z.string().nonempty("Last Name is required"),
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email_id: z.string().email("Invalid email format"),
  });

  const createAccountSchema = z.object({
    userId: z.string().nonempty("User ID is required"),
    balance: z
      .string()
      .min(5, "Amount String must be at least 5 characters long")
      .max(100, "Amount String must be at most 10 characters long"),
    active: z.boolean(), // Add validation for active status
  });

  const handleCreateUser = async () => {
    setIsSubmitting(true);

    try {
      // Validate input data
      const validatedData = createUserSchema.parse({
        user_id,
        first_name,
        last_name,
        username: newUsername,
        email_id,
      });

      // Make API request
      const response = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      const result = await response.json();
      toast({
        title: "Success",
        description: "User created successfully!",
        variant: "default",
      });
      console.log(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Display validation errors
        error.errors.forEach((err) =>
          toast({
            title: "Validation Error",
            description: err.message,
            variant: "destructive",
          })
        );
      } else {
        toast({
          title: "Error",
          description: "An error occurred while creating the user.",
          variant: "destructive",
        });
        console.error(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateAccount = async () => {
    setIsSubmitting(true);

    try {
      // Validate account data
      const validatedData = createAccountSchema.parse({
        userId:user_id,
        balance:amount,
        active:isActive, // Include the account status
      });

      // Make API request
      const response = await fetch("/api/account/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      const result = await response.json();
      toast({
        title: "Success",
        description: "Account created successfully!",
        variant: "default",
      });
      console.log(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Display validation errors
        error.errors.forEach((err) =>
          toast({
            title: "Validation Error",
            description: err.message,
            variant: "destructive",
          })
        );
      } else {
        toast({
          title: "Error",
          description: "An error occurred while creating the account.",
          variant: "destructive",
        });
        console.error(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-6 space-y-10">
      {/* Tabs Section */}
      <section className="w-full max-w-4xl">
        <Tabs defaultValue="createUser" className="w-full">
          <TabsList>
            <TabsTrigger value="createUser">Create User</TabsTrigger>
            <TabsTrigger value="createAccount">Create Account</TabsTrigger>
          </TabsList>

          {/* Create User Tab */}
          <TabsContent value="createUser">
            <Card>
              <CardHeader>
                <CardTitle>Create User</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="user_id">User ID</Label>
                    <Input
                      value={user_id}
                      id="user_id"
                      readOnly
                      placeholder="User ID"
                      className="cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      value={first_name}
                      id="first_name"
                      readOnly
                      placeholder="First Name"
                      className="cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      value={last_name}
                      id="last_name"
                      readOnly
                      placeholder="Last Name"
                      className="cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email_id">Email ID</Label>
                    <Input
                      value={email_id}
                      id="email_id"
                      readOnly
                      placeholder="Email ID"
                      className="cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <Label htmlFor="username">
                      Username{" "}
                      <span className="text-emerald-500">(Editable)</span>
                    </Label>
                    <Input
                      value={newUsername}
                      id="username"
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="Enter new username"
                    />
                  </div>

                  <Button
                    onClick={handleCreateUser}
                    disabled={isSubmitting}
                    className="mt-4"
                    size="lg"
                  >
                    {isSubmitting ? "Creating..." : "Create"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create Account Tab */}
          <TabsContent value="createAccount">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="user_id">User ID</Label>
                    <Input
                      value={user_id}
                      id="user_id"
                      readOnly
                      placeholder="User ID"
                      className="cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      value={amount}
                      id="amount"
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="isActive" checked={isActive} onCheckedChange={(checked) => setIsActive(checked === true)} />
                    <Label htmlFor="isActive">Account Activate</Label>
                  </div>

                  <Button
                    onClick={handleCreateAccount}
                    disabled={isSubmitting}
                    className="mt-4"
                    size="lg"
                  >
                    {isSubmitting ? "Creating..." : "Create Account"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
