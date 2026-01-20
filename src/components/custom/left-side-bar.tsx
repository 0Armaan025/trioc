"use client";

import React, { useState } from 'react';
import { Home, Compass, Bell, Mail, Bookmark, Users, Settings, TrendingUp, Search, Plus, LogOutIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const LEFT_SIDE_BAR_ITEMS = [
  { icon: Home, title: 'Home', badge: null },
  { icon: Compass, title: 'Explore', badge: null },
  { icon: Mail, title: 'Messages', badge: 3 },
  { icon: Bookmark, title: 'Bookmarks', badge: null },
  { icon: TrendingUp, title: 'Trending', badge: null },
  { icon: Users, title: 'Communities', badge: null },
  { icon: Settings, title: 'Settings', badge: null },
  { icon: LogOutIcon, title: 'Log out', imp: true },
];

const LeftSideBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-72 h-screen flex flex-col bg-[#0e0f0e] border-r border-zinc-800 relative overflow-hidden">

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
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto relative z-10">
        {LEFT_SIDE_BAR_ITEMS.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeIndex === index;

          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 relative group",
                isActive
                  ? 'bg-zinc-900 text-white border border-zinc-800'
                  : 'text-gray-400 hover:text-white hover:bg-zinc-900/50'
                ,
                item?.imp === true ? "bg-red-500 text-white" : "",
              )}
            >
              {/* Active indicator */}
              {isActive && (
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
      </div>
    </div>
  );
};

export default LeftSideBar;
