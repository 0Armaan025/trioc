"use client";

import React, { useState } from 'react';
import {
  Users, Plus, Bot, Ticket, Database, ExternalLink,
  TrendingUp, MessageSquare, Clock, Building2,
  Globe, Activity, Zap, ChevronRight, MoreHorizontal
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// --- Mock Data for Charts ---
const TICKET_DATA = [
  { name: 'Mon', tickets: 45 },
  { name: 'Tue', tickets: 52 },
  { name: 'Wed', tickets: 48 },
  { name: 'Thu', tickets: 70 },
  { name: 'Fri', tickets: 61 },
  { name: 'Sat', tickets: 38 },
  { name: 'Sun', tickets: 42 },
];

const AGENT_WORKLOAD = [
  { name: 'Support Bot A', value: 400, color: '#3b82f6' },
  { name: 'Sales Bot', value: 300, color: '#a855f7' },
  { name: 'Billing Agent', value: 200, color: '#22c55e' },
];

const Dashboard = () => {
  const [hasOrganization, setHasOrganization] = useState(true);
  const [isAdmin] = useState(true);
  const [showOrgModal, setShowOrgModal] = useState(!hasOrganization);

  // Stats State
  const stats = {
    totalTickets: 1247,
    activeTickets: 89,
    avgResponseTime: '2.3m',
    solvedToday: 45,
    countries: [
      { name: 'United States', count: '45%', flag: '🇺🇸' },
      { name: 'United Kingdom', count: '12%', flag: '🇬🇧' },
      { name: 'Germany', count: '8%', flag: '🇩🇪' },
      { name: 'India', count: '15%', flag: '🇮🇳' },
    ],
    liveActivity: [
      { agent: 'Support Bot A', task: 'Resolving Refund Query', user: 'user_9921', status: 'active' },
      { agent: 'Sales Bot', task: 'Pricing Inquiry', user: 'user_4412', status: 'typing' },
      { agent: 'Billing Agent', task: 'Subscription Upgrade', user: 'user_0091', status: 'active' },
    ]
  };

  const StatCard = ({ icon: Icon, label, value, trend, color = "text-white" }) => (
    <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-xl">
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-2 rounded-lg bg-zinc-800 border border-zinc-700", color)}>
          <Icon size={18} />
        </div>
        {trend && <span className="text-green-500 text-xs font-medium flex items-center gap-1">
          <TrendingUp size={12} /> {trend}
        </span>}
      </div>
      <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">{label}</p>
      <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
    </div>
  );

  if (!hasOrganization) return <div>{/* ... existing Join/Create Logic ... */}</div>;

  return (
    <div className="min-h-screen bg-[#09090b] w-full text-zinc-400 p-4 lg:p-8 font-sans">
      <div className=" space-y-8">

        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Building2 size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Acme Corporation</h1>
              <p className="text-sm text-zinc-500 flex items-center gap-2">
                <Activity size={14} className="text-green-500" />
                System operational • v2.4.0
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800">
              Settings
            </Button>
            <Button className="bg-white text-black hover:bg-zinc-200 shadow-sm">
              <Plus size={18} className="mr-2" /> New Agent
            </Button>
          </div>
        </header>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Ticket} label="Total Volume" value={stats.totalTickets} trend="+12.5%" />
          <StatCard icon={MessageSquare} label="Live Chats" value={stats.activeTickets} color="text-blue-400" />
          <StatCard icon={Clock} label="Avg. Latency" value={stats.avgResponseTime} color="text-yellow-400" />
          <StatCard icon={Zap} label="Resolution Rate" value="94.2%" color="text-green-400" trend="+2%" />
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Ticket Volume Chart */}
          <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <TrendingUp size={18} className="text-indigo-400" />
                Ticket Volume Trends
              </h3>
              <select className="bg-zinc-800 border-none text-xs text-zinc-300 rounded px-2 py-1">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TICKET_DATA}>
                  <defs>
                    <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="tickets" stroke="#818cf8" fillOpacity={1} fill="url(#colorTickets)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Geographies */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-white font-semibold flex items-center gap-2 mb-6">
              <Globe size={18} className="text-blue-400" />
              Traffic Origins
            </h3>
            <div className="space-y-6">
              {stats.countries.map((c, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-300 flex items-center gap-2">
                      <span className="grayscale-[0.5]">{c.flag}</span> {c.name}
                    </span>
                    <span className="text-white font-medium">{c.count}</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full"
                      style={{ width: c.count }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Interaction & Agent Workload */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Live Activity Feed */}
          <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <h3 className="text-white font-semibold">Live Agent Activity</h3>
              <div className="flex items-center gap-2 text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Live
              </div>
            </div>
            <div className="divide-y divide-zinc-800">
              {stats.liveActivity.map((act, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                      <Bot size={20} className="text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{act.agent}</p>
                      <p className="text-zinc-500 text-xs">{act.task}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="hidden md:block">
                      <p className="text-zinc-400 text-xs">User ID</p>
                      <p className="text-zinc-200 text-xs font-mono">{act.user}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white">
                      <ChevronRight size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Distribution Chart */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 flex flex-col">
            <h3 className="text-white font-semibold mb-2">Workload Split</h3>
            <p className="text-xs text-zinc-500 mb-4">Tickets handled per agent</p>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={AGENT_WORKLOAD}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {AGENT_WORKLOAD.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {AGENT_WORKLOAD.map((agent, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: agent.color }} />
                    <span className="text-zinc-400">{agent.name}</span>
                  </div>
                  <span className="text-white font-medium">{((agent.value / 900) * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
