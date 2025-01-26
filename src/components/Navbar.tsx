"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { Menu, Webhook, X } from "lucide-react";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href}>
      <span className={`
        ${isActive(href) 
          ? 'text-foreground font-semibold text-indigo-600' 
          : 'text-muted-foreground hover:text-foreground'}
      `}>
        {children}
      </span>
    </Link>
  );

  return (
    <header suppressHydrationWarning className="sticky top-0 left-0 w-full bg-background/80 backdrop-blur-md shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-4">
          <Webhook className="h-6 w-6 text-indigo-600 inline-block" />
          <NavLink href="/">TapFlow</NavLink>
        </div>

        <nav className="hidden md:flex space-x-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/features">Features</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        <div className="flex items-center space-x-4">
          <ModeToggle />
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <Button>Login</Button>
            </Link>
          </SignedOut>
        </div>

        <div className="md:hidden flex items-center justify-end px-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden sticky top-full right-0 w-full bg-background/80 backdrop-blur-md shadow-md py-4 px-6 z-50 pr-8">
          <nav className="flex flex-col space-y-4 items-end">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/features">Features</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}