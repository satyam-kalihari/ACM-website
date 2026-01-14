"use client";

import Link from "next/link";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";


const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/rooms", label: "Rooms" },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-md supports-[backdrop-filter]:bg-black/40">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            {/* Placeholder for Logo if needed, generally text is fine or replace with Image */}
            <span className="text-xl font-bold tracking-tight text-white">
              ACM <span className="text-[#00BCA2]">HUB</span>
            </span>
          </Link>
        </div>

        {/* Right Side: Desktop Navigation & Auth */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-300 transition-colors hover:text-[#00BCA2]"
            >
              {link.label}
            </Link>
          ))}

          <div className="ml-2 flex items-center gap-4">
            <ModeToggle />
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" className="border-[#00BCA2] text-[#00BCA2] hover:bg-[#00BCA2] hover:text-black">Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9"
                  }
                }}
              />
            </SignedIn>
          </div>
        </nav>


        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#050509] border-l border-white/10 text-white">
              <div className="flex flex-col gap-6 mt-6">
                <SheetTitle className="text-xl font-bold">
                  Measurement
                  <span className="text-[#00BCA2]"> Menu</span>
                </SheetTitle>
                <SheetDescription className="text-gray-400 text-xs">
                  Navigate through the ACM Hub application.
                </SheetDescription>

                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-gray-300 transition-colors hover:text-[#00BCA2]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="mt-4 border-t border-white/10 pt-4 cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400">Theme</span>
                    <ModeToggle />
                  </div>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button className="w-full bg-[#00BCA2] text-black hover:bg-[#00BCA2]/90">Sign In</Button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <div className="flex items-center gap-2">
                      <UserButton />
                      <span className="text-sm text-gray-400">My Profile</span>
                    </div>
                  </SignedIn>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
