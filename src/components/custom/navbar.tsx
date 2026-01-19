"use client";

import { useState } from "react";
import { Karla, Source_Code_Pro } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { CoinsIcon, Menu, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
const karlaFont = Karla({ subsets: ["latin"] });
const sourceCodeFont = Source_Code_Pro({ subsets: ["latin"] });

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full text-gray-200 bg-[#0e0f0e] px-6 md:px-52 py-6 border-b border-gray-800 flex justify-between items-center">

      {/* Left */}
      <div className="flex items-center gap-x-10">
        {/* Branding */}
        <div className="flex gap-x-2 items-center cursor-pointer">
          <img src="/logo.svg" className="h-6 w-6" alt="logo" />
          <h1 className={cn("text-2xl font-semibold", karlaFont.className)}>
            Trioc
          </h1>
        </div>

        {/* Desktop Links */}
        <div
          className={cn(
            "hidden md:flex gap-x-6 text-lg",
            sourceCodeFont.className
          )}
        >
          <h3 className="hover:border-b hover:border-white cursor-pointer">Documentation</h3>
          <h3 className="hover:border-b hover:border-white cursor-pointer">Pricing</h3>
          <h3 className="hover:border-b hover:border-white cursor-pointer">Support</h3>
        </div>
      </div>

      {/* Right */}
      <div className="hidden md:flex">
        <Button variant="outline" className="border-gray-700 cursor-pointer transition-all">
          Dashboard
        </Button>
        <Badge variant="outline" className="text-white px-4 py-2 ml-4 border-gray-700 border-1"><CoinsIcon />300 Tokens</Badge>
      </div>

      {/* Burger Icon (Mobile) */}
      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[72px] left-0 w-full bg-[#0e0f0e] border-t border-gray-800 flex flex-col items-center gap-y-6 py-6 md:hidden">
          <h3 className="cursor-pointer">Documentation</h3>
          <h3 className="cursor-pointer">Pricing</h3>
          <h3 className="cursor-pointer">Support</h3>
          <Button variant="outline" className="border-gray-700">
            Dashboard
          </Button>
        </div>
      )}
    </nav>
  );
};
