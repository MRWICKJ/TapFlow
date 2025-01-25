"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Page() {
  return (
    <div className="max-h-screen bg-background text-foreground p-6 flex items-center justify-center pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Left Side: Image */}
        <div className="flex items-center justify-center">
          <Image
            src="https://i.pinimg.com/originals/a9/b7/52/a9b7522224676f51d9610141b5e405be.gif" // Replace with your desired image URL
            alt="Contact Illustration"
            width={500}
            height={500}
            className="rounded-lg shadow-lg w-full max-w-md"
          />
        </div>

        {/* Right Side: Contact Form */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
                  Your Name
                </label>
                <Input type="text" id="name" placeholder="Enter your name" required />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                  Your Email
                </label>
                <Input type="email" id="email" placeholder="Enter your email" required />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground">
                  Your Message
                </label>
                <Textarea id="message" rows={4} placeholder="Write your message" required />
              </div>

              {/* Submit Button */}
              <div className="text-right">
                <Button type="submit">Send Message</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
