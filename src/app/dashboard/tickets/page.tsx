"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Paperclip, User, Bot, CheckCheck, Check, AlertCircle, Clock, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const Tickets = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ongoing');
  const messagesEndRef = useRef(null);

  // Mock tickets data
  const [tickets] = useState([
    {
      _id: '507f1f77bcf86cd799439011',
      ticketId: 'tkt_001',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.j@example.com',
      customerPhone: '+1 (555) 123-4567',
      customerCountry: 'United States',
      lastMessage: 'Thanks for your help!',
      lastMessageTime: '2m ago',
      behavior: 'normal',
      agentHandling: 'agt_support_01',
      agentName: 'Support Bot Alpha',
      humans: ['john.doe@acme.com'],
      status: 'solved',
      createdAt: '2026-01-23T09:00:00Z',
      updatedAt: '2026-01-23T10:30:00Z',
      unreadCount: 0,
    },
    {
      _id: '507f1f77bcf86cd799439012',
      ticketId: 'tkt_002',
      customerName: 'Michael Chen',
      customerEmail: 'mchen@example.com',
      customerPhone: '+1 (555) 234-5678',
      customerCountry: 'Canada',
      lastMessage: 'I need urgent assistance with my account',
      lastMessageTime: '5m ago',
      behavior: 'escalated',
      agentHandling: 'agt_support_02',
      agentName: 'Support Bot Beta',
      humans: ['jane.smith@acme.com'],
      status: 'pending',
      createdAt: '2026-01-23T09:30:00Z',
      updatedAt: '2026-01-23T10:35:00Z',
      unreadCount: 2,
    },
    {
      _id: '507f1f77bcf86cd799439013',
      ticketId: 'tkt_003',
      customerName: 'Emma Williams',
      customerEmail: 'emma.w@example.com',
      customerPhone: '+44 20 1234 5678',
      customerCountry: 'United Kingdom',
      lastMessage: 'When will this be resolved?',
      lastMessageTime: '15m ago',
      behavior: 'emergency',
      agentHandling: 'agt_support_01',
      agentName: 'Support Bot Alpha',
      humans: ['john.doe@acme.com', 'admin@acme.com'],
      status: 'pending',
      createdAt: '2026-01-23T08:00:00Z',
      updatedAt: '2026-01-23T10:20:00Z',
      unreadCount: 1,
    },
    {
      _id: '507f1f77bcf86cd799439014',
      ticketId: 'tkt_004',
      customerName: 'David Martinez',
      customerEmail: 'dmartinez@example.com',
      customerPhone: '+34 91 123 4567',
      customerCountry: 'Spain',
      lastMessage: 'Perfect, that solved my issue!',
      lastMessageTime: '1h ago',
      behavior: 'normal',
      agentHandling: 'agt_support_03',
      agentName: 'Support Bot Gamma',
      humans: [],
      status: 'solved',
      createdAt: '2026-01-23T07:30:00Z',
      updatedAt: '2026-01-23T09:15:00Z',
      unreadCount: 0,
    },
    {
      _id: '507f1f77bcf86cd799439015',
      ticketId: 'tkt_005',
      customerName: 'Lisa Anderson',
      customerEmail: 'lisa.a@example.com',
      customerPhone: '+61 2 1234 5678',
      customerCountry: 'Australia',
      lastMessage: 'Issue resolved, thanks!',
      lastMessageTime: '2d ago',
      behavior: 'normal',
      agentHandling: 'agt_support_02',
      agentName: 'Support Bot Beta',
      humans: ['jane.smith@acme.com'],
      status: 'closed',
      createdAt: '2026-01-21T10:00:00Z',
      updatedAt: '2026-01-21T14:30:00Z',
      unreadCount: 0,
    },
  ]);

  // Mock messages
  const [messages] = useState({
    tkt_002: [
      {
        msgId: 'msg_001',
        content: 'Hello! I need help with my account. I cannot log in.',
        by: 'customer',
        hasCustomerSeen: true,
        hasAgentSeen: true,
        country: 'Canada',
        createdAt: '2026-01-23T09:30:00Z',
      },
      {
        msgId: 'msg_002',
        content: 'Hi Michael! I\'ll help you with that. Can you provide me with your account email?',
        by: 'agent',
        hasCustomerSeen: true,
        hasAgentSeen: true,
        createdAt: '2026-01-23T09:31:00Z',
      },
      {
        msgId: 'msg_003',
        content: 'Sure, it\'s mchen@example.com',
        by: 'customer',
        hasCustomerSeen: true,
        hasAgentSeen: true,
        country: 'Canada',
        createdAt: '2026-01-23T09:32:00Z',
      },
      {
        msgId: 'msg_004',
        content: 'Let me check that for you. One moment please.',
        by: 'agent',
        hasCustomerSeen: false,
        hasAgentSeen: true,
        createdAt: '2026-01-23T09:33:00Z',
      },
      {
        msgId: 'msg_005',
        content: 'I\'m transferring this to our senior support team.',
        by: 'human',
        hasCustomerSeen: false,
        hasAgentSeen: true,
        createdAt: '2026-01-23T09:34:00Z',
      },
      {
        msgId: 'msg_006',
        content: 'I need urgent assistance with my account',
        by: 'customer',
        hasCustomerSeen: true,
        hasAgentSeen: false,
        country: 'Canada',
        createdAt: '2026-01-23T10:35:00Z',
      },
    ],
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedTicket]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    console.log('Sending message:', messageInput);
    setMessageInput('');
  };

  const getBehaviorBadge = (behavior) => {
    switch (behavior) {
      case 'emergency':
        return <span className="px-2 py-0.5 text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20 rounded-full">Emergency</span>;
      case 'escalated':
        return <span className="px-2 py-0.5 text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full">Escalated</span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20 rounded-full">Normal</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'solved':
        return <span className="px-2 py-0.5 text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20 rounded-full">Solved</span>;
      case 'pending':
        return <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-full">Pending</span>;
      case 'closed':
        return <span className="px-2 py-0.5 text-xs font-medium bg-gray-500/10 text-gray-500 border border-gray-500/20 rounded-full">Closed</span>;
      default:
        return null;
    }
  };

  const ongoingTickets = tickets.filter(t => t.status === 'pending' || t.status === 'solved');
  const inactiveTickets = tickets.filter(t => t.status === 'closed');

  const displayTickets = activeTab === 'ongoing' ? ongoingTickets : inactiveTickets;
  const filteredTickets = displayTickets.filter(t =>
    t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.ticketId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedTicketData = tickets.find(t => t.ticketId === selectedTicket);
  const ticketMessages = selectedTicket ? messages[selectedTicket] || [] : [];

  return (
    <div className="h-screen bg-[#0e0f0e] flex w-full" >
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

      {/* Tickets List */}
      <div className="w-80 border-r border-zinc-800 flex flex-col relative z-10">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800">
          <h1 className="text-white text-xl font-semibold mb-4">Tickets</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-900">
              <TabsTrigger value="ongoing" className="data-[state=active]:bg-zinc-800">
                Ongoing ({ongoingTickets.length})
              </TabsTrigger>
              <TabsTrigger value="inactive" className="data-[state=active]:bg-zinc-800">
                Inactive ({inactiveTickets.length})
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-zinc-900 border-zinc-800 text-white"
            />
          </div>
        </div>

        {/* Tickets */}
        <div className="flex-1 overflow-y-auto">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.ticketId}
              onClick={() => setSelectedTicket(ticket.ticketId)}
              className={cn(
                "p-4 border-b border-zinc-800 cursor-pointer transition-colors hover:bg-zinc-900",
                selectedTicket === ticket.ticketId && "bg-zinc-900"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {ticket.customerName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{ticket.customerName}</p>
                    <p className="text-gray-500 text-xs truncate">{ticket.ticketId}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-gray-500 text-xs">{ticket.lastMessageTime}</span>
                  {ticket.unreadCount > 0 && (
                    <span className="bg-blue-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                      {ticket.unreadCount}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-400 text-sm truncate mb-2">{ticket.lastMessage}</p>
              <div className="flex items-center gap-2">
                {getBehaviorBadge(ticket.behavior)}
                {getStatusBadge(ticket.status)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {selectedTicketData ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white font-semibold">
                  {selectedTicketData.customerName.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold">{selectedTicketData.customerName}</p>
                  <p className="text-gray-500 text-xs">{selectedTicketData.ticketId}</p>
                </div>
                {getBehaviorBadge(selectedTicketData.behavior)}
                {getStatusBadge(selectedTicketData.status)}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {ticketMessages.map((msg) => (
                <div
                  key={msg.msgId}
                  className={cn(
                    "flex gap-3",
                    msg.by === 'customer' ? "flex-row" : "flex-row-reverse"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    msg.by === 'customer'
                      ? "bg-blue-500/10 border border-blue-500/20"
                      : msg.by === 'agent'
                        ? "bg-purple-500/10 border border-purple-500/20"
                        : "bg-green-500/10 border border-green-500/20"
                  )}>
                    {msg.by === 'customer' ? (
                      <User size={16} className="text-blue-500" />
                    ) : msg.by === 'agent' ? (
                      <Bot size={16} className="text-purple-500" />
                    ) : (
                      <User size={16} className="text-green-500" />
                    )}
                  </div>

                  <div className={cn(
                    "flex flex-col gap-1 max-w-[70%]",
                    msg.by === 'customer' ? "items-start" : "items-end"
                  )}>
                    <div className={cn(
                      "px-4 py-2 rounded-lg",
                      msg.by === 'customer'
                        ? "bg-zinc-800 text-white"
                        : msg.by === 'agent'
                          ? "bg-purple-600 text-white"
                          : "bg-green-600 text-white"
                    )}>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-gray-500 text-xs">
                        {new Date(msg.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      {msg.by !== 'customer' && (
                        msg.hasCustomerSeen ? (
                          <CheckCheck size={14} className="text-blue-500" />
                        ) : (
                          <Check size={14} className="text-gray-500" />
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-zinc-900 rounded-lg transition-colors">
                  <Paperclip size={20} className="text-gray-400" />
                </button>
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-zinc-900 border-zinc-800 text-white"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} className="text-gray-500" />
              </div>
              <h3 className="text-white text-lg font-medium mb-2">Select a ticket</h3>
              <p className="text-gray-500 text-sm">Choose a ticket from the list to view the conversation</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Ticket Details */}
      {selectedTicketData && (
        <div className="w-80 border-l border-zinc-800 flex flex-col relative z-10 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Customer Info */}
            <div>
              <h3 className="text-white text-sm font-semibold mb-4">Customer Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-xs">Name</p>
                    <p className="text-white text-sm">{selectedTicketData.customerName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-xs">Email</p>
                    <p className="text-white text-sm break-all">{selectedTicketData.customerEmail}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-xs">Phone</p>
                    <p className="text-white text-sm">{selectedTicketData.customerPhone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-xs">Country</p>
                    <p className="text-white text-sm">{selectedTicketData.customerCountry}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Info */}
            <div className="pt-6 border-t border-zinc-800">
              <h3 className="text-white text-sm font-semibold mb-4">Agent Handling</h3>
              <div className="flex items-center gap-3 p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                  <Bot size={20} className="text-purple-500" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{selectedTicketData.agentName}</p>
                  <p className="text-gray-500 text-xs">{selectedTicketData.agentHandling}</p>
                </div>
              </div>
            </div>

            {/* Human Support */}
            {selectedTicketData.humans && selectedTicketData.humans.length > 0 && (
              <div className="pt-6 border-t border-zinc-800">
                <h3 className="text-white text-sm font-semibold mb-4">Human Support Team</h3>
                <div className="space-y-2">
                  {selectedTicketData.humans.map((email, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white font-semibold text-xs">
                        {email.charAt(0).toUpperCase()}
                      </div>
                      <p className="text-white text-sm">{email}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ticket Meta */}
            <div className="pt-6 border-t border-zinc-800">
              <h3 className="text-white text-sm font-semibold mb-4">Ticket Details</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar size={16} className="text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-xs">Created</p>
                    <p className="text-white text-sm">
                      {new Date(selectedTicketData.createdAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-xs">Last Updated</p>
                    <p className="text-white text-sm">
                      {new Date(selectedTicketData.updatedAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tickets;
