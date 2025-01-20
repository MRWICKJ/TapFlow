"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { Menu, Webhook, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 w-full bg-background/80 backdrop-blur-md shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Webhook className="h-6 w-6 text-indigo-600 inline-block" />
          <Link href="/">
            <span className="text-xl font-bold text-primary">TapFlow</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/">
            <span className="text-muted-foreground hover:text-foreground">Home</span>
          </Link>
          <Link href="/features">
            <span className="text-muted-foreground hover:text-foreground">Features</span>
          </Link>
          <Link href="/pricing">
            <span className="text-muted-foreground hover:text-foreground">Pricing</span>
          </Link>
          <Link href="/about">
            <span className="text-muted-foreground hover:text-foreground">About</span>
          </Link>
          <Link href="/contact">
            <span className="text-muted-foreground hover:text-foreground">Contact</span>
          </Link>
        </nav>

        {/* Theme Toggle */}
        <div className="flex items-center space-x-4">
          <ModeToggle />

          {/* Call to Action - Hidden on Mobile */}
          <div>
            <Button asChild>
              <Link href="/sign-in">Login</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center justify-end px-6">
          <Button variant="outline" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X/> : <Menu/>}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden sticky top-full right-0 w-full bg-background/80 backdrop-blur-md shadow-md py-4 px-6 z-50 pr-8">
          <nav className="flex flex-col space-y-4 items-end">
            <Link href="/">
              <span className="text-muted-foreground hover:text-foreground">Home</span>
            </Link>
            <Link href="/features">
              <span className="text-muted-foreground hover:text-foreground">Features</span>
            </Link>
            <Link href="/pricing">
              <span className="text-muted-foreground hover:text-foreground">Pricing</span>
            </Link>
            <Link href="/about">
              <span className="text-muted-foreground hover:text-foreground">About</span>
            </Link>
            <Link href="/contact">
              <span className="text-muted-foreground hover:text-foreground">Contact</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
