"use client";

import React, { useState, useEffect } from 'react';
import { Home, Compass, Mail, Settings, Plus, Menu, X, Ticket, Link2, LogOut, DatabaseIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { cn } from '@/lib/utils';

const LEFT_SIDE_BAR_ITEMS = [
  { icon: Home, title: 'Dashboard', badge: null, link: "/dashboard" },
  { icon: Compass, title: 'Agents', badge: null, link: "/dashboard/agents" },
  { icon: DatabaseIcon, title: 'Datasources', badge: null, link: "/dashboard/datasources" },
  { icon: Mail, title: 'Messages', badge: 3, link: "/dashboard/messages" },
  { icon: Ticket, title: 'Tickets', badge: null, link: "/dashboard/tickets" },
  { icon: Link2, title: 'Integrations', badge: null, link: "/dashboard/integrations" },
  { icon: Settings, title: 'Settings', badge: null, link: "/dashboard/settings" },
  { icon: LogOut, title: 'Log out', imp: true, link: "/" },
];

const LeftSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const checkIsActive = (link: string) => {
    if (link === "/" && pathname === "/") return true;
    if (link !== "/" && pathname.startsWith(link)) return true;
    return false;
  };

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="p-6 border-b border-zinc-800 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">Agent App</h2>
            <p className="text-gray-500 text-xs">Dashboard</p>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden ml-auto text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto relative z-10">
        {LEFT_SIDE_BAR_ITEMS.map((item, index) => {
          const Icon = item.icon;
          const isActive = checkIsActive(item.link);

          return (
            <Link href={item.link.toString()} key={index} onClick={() => setIsOpen(false)}>
              <button
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 relative group",
                  isActive
                    ? 'bg-zinc-900 text-white border border-zinc-800'
                    : 'text-gray-400 hover:text-white hover:bg-zinc-900/50',
                  item?.imp === true ? "bg-red-500 hover:bg-red-600 text-white" : "",
                )}
              >
                {/* Active indicator */}
                {isActive && !item.imp && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
                )}

                <Icon size={20} className={cn(isActive && "text-white")} />

                <span className={cn(
                  "flex-1 text-left text-sm",
                  isActive ? 'font-semibold' : 'font-medium'
                )}>
                  {item.title}
                </span>

                {/* Badge */}
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-zinc-800 text-white rounded-full min-w-[20px] text-center border border-zinc-700">
                    {item.badge}
                  </span>
                )}
              </button>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-zinc-800 space-y-3 relative z-10">
        {/* New Agent Button */}
        <button className="w-full cursor-pointer bg-[#0e0f0e] border border-zinc-800 hover:bg-zinc-900 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all">
          <Plus size={20} />
          <span>Create Agent</span>
        </button>

        {/* User Profile */}
        <Link href="/dashboard/profile" onClick={() => setIsOpen(false)}>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-900/70 transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">John Doe</p>
              <p className="text-gray-500 text-xs truncate">@johndoe</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile burger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
      >
        <Menu size={24} />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "w-72 h-screen flex flex-col bg-[#0e0f0e] border-r border-zinc-800 relative overflow-hidden",
          "fixed lg:static top-0 left-0 z-40 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Subtle grid background overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div
            className={cn(
              "w-full h-full",
              "bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]",
              "bg-[size:40px_40px]"
            )}
          />
        </div>

        <SidebarContent />
      </div>

    </>
  );
};

export default LeftSideBar;
