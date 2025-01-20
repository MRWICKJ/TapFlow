"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ShieldCheck, Globe, Zap, Laugh } from "lucide-react";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [randomMoney, setRandomMoney] = useState<string | null>(null);
  const [activeUser, setActiveUser] = useState<string | null>(null);
  const [transactionAmount, setTransactionAmount] = useState<string | null>(null);

  function generateRandomMoney(inputString: string) {
    const hash = Array.from(inputString).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    const randomAmount = hash % 10000; // Generates a random amount up to 100.00
    setRandomMoney(randomAmount.toFixed(2));
  }
  async function fetchActiveUsers() {
    try {
      const response = await fetch("/api/user/findAll",{next:{revalidate:60}});
      if (!response.ok) {
        throw new Error("Failed to fetch Users");
      }
      const data = await response.json();
      setActiveUser(data.length);
    } catch (error) {
      console.error("Failed to fetch active users", error);
    }
  }
  async function fetchTransactions() {
    try {
      const response = await fetch("/api/transaction/findAll",{next:{revalidate:30}});
      if (!response.ok) {
        throw new Error("Failed to fetch Transactions");
      }
      const data = await response.json();
      let amount = 0;
      data.forEach((transaction: { amount: number }) => {
        amount += transaction.amount;
      });
      setTransactionAmount(amount.toFixed(2));
    } catch (error) {
      console.error("Failed to fetch active users", error);
    }
  }
  useEffect(() => {
    fetchActiveUsers();
    fetchTransactions();
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-6 space-y-10">
      {/* Introduction Section */}
      <section className="w-full max-w-4xl text-center space-y-6">
        <h2 className="text-2xl font-semibold">
          Send and Receive Money Effortlessly
        </h2>
        <p className="text-muted-foreground">
          TapFlow makes sending and receiving money fast, secure, and simple.
          With state-of-the-art encryption and fraud protection, your
          transactions are always safe.
        </p>
      </section>

      {/* Random Money Generator */}
      <section className="w-full max-w-4xl flex flex-col items-center space-y-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Generate Random Money</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Enter a string to generate random money"
              onChange={(e) => generateRandomMoney(e.target.value)}
            />
            {randomMoney && (
              <p className="text-lg font-medium">
                Generated Amount:{" "}
                <span className="text-primary">${randomMoney}</span>
              </p>
            )}
          </CardContent>
        </Card>
      </section>
       {/* Statistics Section */}
       <section className="w-full max-w-4xl space-y-8 text-center">
        <h3 className="text-xl font-semibold">TapFlow in Numbers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4">
              <h4 className="text-2xl font-bold">{activeUser}</h4>
              <p className="text-muted-foreground">Total Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h4 className="text-2xl font-bold">${transactionAmount}</h4>
              <p className="text-muted-foreground">Total Transactions</p>
            </CardContent>
          </Card>
        </div>
      </section>


      {/* Features Section */}
      <section className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold">Why Choose TapFlow?</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-indigo-400" />
              <CardTitle>Fast Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                With TapFlow, you can send money to anyone, anywhere in the
                world, in just seconds.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center space-x-2">
              <ShieldCheck className="h-6 w-6 text-emerald-500" />
              <CardTitle>Advanced Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Your security is our priority. TapFlow uses advanced encryption
                to keep your money safe.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center space-x-2">
              <Laugh className="h-6 w-6 text-amber-500" />
              <CardTitle>Easy to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our intuitive interface ensures you can manage your transactions
                with ease.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-blue-600" />
              <CardTitle>Global Reach</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Send and receive money across borders with no hassle.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="w-full max-w-4xl space-y-6">
        <h3 className="text-xl font-semibold text-center">
          Learn More About TapFlow
        </h3>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What is TapFlow?</AccordionTrigger>
            <AccordionContent>
              TapFlow is a modern payment solution that allows you to send and
              receive money globally with ease and security.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How secure is TapFlow?</AccordionTrigger>
            <AccordionContent>
              We use advanced encryption and fraud detection technologies to
              ensure that your transactions are secure at all times.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Can I use TapFlow internationally?
            </AccordionTrigger>
            <AccordionContent>
              Yes, TapFlow supports international transactions, allowing you to
              send and receive money across borders seamlessly.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

     
      {/* Additional Section: Testimonials */}
      <section className="w-full max-w-4xl text-center space-y-6">
        <h3 className="text-xl font-semibold">What Our Users Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4">
              <p className="italic">
                “TapFlow has made my life so much easier. Transactions are quick
                and secure!”
              </p>
              <p className="text-muted-foreground mt-4">- Alex, Freelancer</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="italic">
                “I love how simple it is to use TapFlow. Highly recommended!”
              </p>
              <p className="text-muted-foreground mt-4">
                - Priya, Entrepreneur
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="italic">
                “The best payment app I’ve ever used. Global reach and security
                are top-notch.”
              </p>
              <p className="text-muted-foreground mt-4">
                - Marco, Business Owner
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="w-full max-w-4xl text-center space-y-6">
        <h3 className="text-xl font-semibold">
          Get Started with TapFlow Today!
        </h3>
        <Button size="lg">Download the App</Button>
      </section>
    </div>
  );
}
