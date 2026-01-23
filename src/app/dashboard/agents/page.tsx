"use client";

import React, { useState } from 'react';
import { Plus, Bot, MessageSquare, Clock, MoreVertical, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// AgentTile Component
const AgentTile = ({ agent }) => {
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'support': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'sales': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'explain': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <Link href={`/dashboard/agent/${agent.agentId}`}>
      <div className="group bg-zinc-900 border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-all cursor-pointer relative overflow-hidden min-h-72">
        {/* Hover gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center group-hover:border-zinc-600 transition-colors">
              <Bot size={24} className="text-white" />
            </div>

            <div className="flex items-center gap-2">
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium border",
                getRoleBadgeColor(agent.agentRole)
              )}>
                {agent.agentRole}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log('More options for', agent.agentId);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-zinc-800 rounded"
              >
                <MoreVertical size={18} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Agent Info */}
          <h3 className="text-white font-semibold text-base mb-1 truncate">
            {agent.agentName}
          </h3>
          <p className="text-gray-500 text-xs mb-3 line-clamp-2 min-h-[2rem]">
            {agent.agentDescription}
          </p>

          {/* Data Sources */}
          {agent.dataSources && agent.dataSources.length > 0 && (
            <div className="mb-3">
              <span className="text-gray-600 text-xs">
                {agent.dataSources.length} data source{agent.dataSources.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-gray-500" />
              <span className="text-gray-400 text-xs">
                {new Date(agent.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>

            {/* Status */}
            <div className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              agent.status === 'active'
                ? "bg-green-500/10 text-green-500 border border-green-500/20"
                : agent.status === 'disabled'
                  ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                  : "bg-red-500/10 text-red-500 border border-red-500/20"
            )}>
              {agent.status}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Main Agents Page
const Agents = () => {
  const [agents] = useState([
    {
      _id: '507f1f77bcf86cd799439011',
      agentId: 'agt_cust_support_01',
      agentName: 'Customer Support Bot',
      agentDescription: 'Handles customer inquiries and support tickets with intelligent responses',
      createdBy: 'john.doe@example.com',
      agentRole: 'support',
      dataSources: ['ds_faq_001', 'ds_docs_002'],
      temperature: 0.7,
      status: 'active',
      createdAt: '2026-01-15T10:30:00Z',
      updatedAt: '2026-01-22T14:20:00Z',
      updatedBy: 'john.doe@example.com'
    },
    {
      _id: '507f1f77bcf86cd799439012',
      agentId: 'agt_sales_assist_02',
      agentName: 'Sales Assistant',
      agentDescription: 'Helps qualify leads and schedule meetings with potential customers',
      createdBy: 'jane.smith@example.com',
      agentRole: 'sales',
      dataSources: ['ds_products_001'],
      temperature: 0.8,
      status: 'active',
      createdAt: '2026-01-10T09:15:00Z',
      updatedAt: '2026-01-21T16:45:00Z',
      updatedBy: 'jane.smith@example.com'
    },
    {
      _id: '507f1f77bcf86cd799439013',
      agentId: 'agt_explainer_03',
      agentName: 'Technical Explainer',
      agentDescription: 'Explains complex technical concepts in simple terms',
      createdBy: 'admin@example.com',
      agentRole: 'explain',
      dataSources: [],
      temperature: 0.5,
      status: 'disabled',
      createdAt: '2026-01-08T11:00:00Z',
      updatedAt: '2026-01-20T10:30:00Z',
      updatedBy: 'admin@example.com'
    }
  ]);

  return (
    <div className="min-h-screen bg-[#0e0f0e] p-6 lg:p-8">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className={cn(
            "w-full h-full",
            "bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]",
            "bg-[size:40px_40px]"
          )}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-2xl font-semibold mb-1">Agents</h1>
            <p className="text-gray-500 text-sm">
              {agents.length} {agents.length === 1 ? 'agent' : 'agents'} total
            </p>
          </div>

          <Button
            className="bg-white cursor-pointer text-black hover:bg-gray-200"
            onClick={() => console.log('Create new agent')}
          >
            <Plus size={18} className="mr-2" />
            Create Agent
          </Button>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <AgentTile key={agent._id} agent={agent} />
          ))}
        </div>

        {/* Empty State */}
        {agents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
              <Bot size={32} className="text-gray-500" />
            </div>
            <h3 className="text-white text-lg font-medium mb-2">No agents yet</h3>
            <p className="text-gray-500 text-sm mb-6">Get started by creating your first agent</p>
            <Button className="bg-white text-black hover:bg-gray-200">
              <Plus size={18} className="mr-2" />
              Create Your First Agent
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agents;
