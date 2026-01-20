"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, CoinsIcon } from "lucide-react";
import { Karla, Source_Code_Pro } from "next/font/google";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const karlaFont = Karla({ subsets: ["latin"] });
const sourceCodeFont = Source_Code_Pro({ subsets: ["latin"] });

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShow(false); // scrolling down → vanish
      } else {
        setShow(true); // scrolling up → reappear
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={cn(
        "w-full text-gray-200 bg-[#0e0f0e] px-6 md:px-52 py-6",
        "border-b border-gray-800 flex justify-between items-center",
        "sticky top-0 z-50 transition-transform duration-300",
        show ? "translate-y-0" : "-translate-y-full"
      )}
    >
      {/* Left */}
      <div className="flex items-center gap-x-10">
        {/* Branding */}
        <div className="flex gap-x-2 items-center cursor-pointer">
          <Image src="/logo.svg" alt="logo" width={24} height={24} />
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
          <h3 className="hover:border-b hover:border-white cursor-pointer">
            Documentation
          </h3>
          <h3 className="hover:border-b hover:border-white cursor-pointer">
            Pricing
          </h3>
          <h3 className="hover:border-b hover:border-white cursor-pointer">
            Support
          </h3>
        </div>
      </div>

      {/* Right */}
      <div className="hidden md:flex items-center">
        <Button variant="outline" className="border-gray-700 cursor-pointer">
          Dashboard
        </Button>
        <Badge
          variant="outline"
          className="text-white px-4 py-2 ml-4 border-gray-700 flex gap-x-1"
        >
          <CoinsIcon size={16} />
          300 Tokens
        </Badge>
      </div>

      {/* Mobile Burger */}
      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-[#0e0f0e] border-t border-gray-800 flex flex-col items-center gap-y-6 py-6 md:hidden">
          <h3 className="cursor-pointer">Documentation</h3>
          <h3 className="cursor-pointer">Pricing</h3>
          <h3 className="cursor-pointer">Support</h3>
          <Button variant="outline" className="border-gray-700 cursor-pointer">
            Dashboard
          </Button>
        </div>
      )}
    </nav>
  );
};
