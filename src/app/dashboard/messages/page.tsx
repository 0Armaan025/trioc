"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, MoreVertical, Plus, Hash, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const Messages = () => {
  const [isOwner] = useState(true); // Set to false to test non-owner view
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [messageInput, setMessageInput] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock channels data
  const [channels] = useState([
    {
      id: 'general',
      name: 'general',
      description: 'General team discussions',
      members: ['john.doe@acme.com', 'jane.smith@acme.com', 'admin@acme.com'],
      unreadCount: 0,
    },
    {
      id: 'support-team',
      name: 'support-team',
      description: 'Support team coordination',
      members: ['john.doe@acme.com', 'jane.smith@acme.com'],
      unreadCount: 3,
    },
    {
      id: 'urgent-tickets',
      name: 'urgent-tickets',
      description: 'Urgent ticket handling',
      members: ['john.doe@acme.com', 'jane.smith@acme.com', 'admin@acme.com', 'sarah.k@acme.com'],
      unreadCount: 0,
    },
    {
      id: 'announcements',
      name: 'announcements',
      description: 'Company announcements',
      members: ['john.doe@acme.com', 'jane.smith@acme.com', 'admin@acme.com', 'sarah.k@acme.com', 'mike.r@acme.com'],
      unreadCount: 1,
    },
  ]);

  // Mock messages for channels
  const [messages] = useState({
    general: [
      {
        msgId: 'msg_001',
        content: 'Good morning team! Ready for another productive day?',
        senderName: 'John Doe',
        senderEmail: 'john.doe@acme.com',
        createdAt: '2026-01-23T09:00:00Z',
      },
      {
        msgId: 'msg_002',
        content: 'Morning John! Yes, let\'s crush it today 💪',
        senderName: 'Jane Smith',
        senderEmail: 'jane.smith@acme.com',
        createdAt: '2026-01-23T09:02:00Z',
      },
      {
        msgId: 'msg_003',
        content: 'Has anyone seen the new dashboard designs?',
        senderName: 'Admin User',
        senderEmail: 'admin@acme.com',
        createdAt: '2026-01-23T09:15:00Z',
      },
      {
        msgId: 'msg_004',
        content: 'Yeah, they look amazing! The dark theme is perfect.',
        senderName: 'Jane Smith',
        senderEmail: 'jane.smith@acme.com',
        createdAt: '2026-01-23T09:16:00Z',
      },
      {
        msgId: 'msg_005',
        content: 'Agreed! I especially love the minimal approach.',
        senderName: 'John Doe',
        senderEmail: 'john.doe@acme.com',
        createdAt: '2026-01-23T09:17:00Z',
      },
    ],
    'support-team': [
      {
        msgId: 'msg_006',
        content: 'We have 3 escalated tickets that need immediate attention',
        senderName: 'Jane Smith',
        senderEmail: 'jane.smith@acme.com',
        createdAt: '2026-01-23T10:30:00Z',
      },
      {
        msgId: 'msg_007',
        content: 'I can take ticket #002 and #003',
        senderName: 'John Doe',
        senderEmail: 'john.doe@acme.com',
        createdAt: '2026-01-23T10:32:00Z',
      },
      {
        msgId: 'msg_008',
        content: 'Perfect, I\'ll handle #001. It\'s an account access issue.',
        senderName: 'Jane Smith',
        senderEmail: 'jane.smith@acme.com',
        createdAt: '2026-01-23T10:33:00Z',
      },
    ],
    'urgent-tickets': [
      {
        msgId: 'msg_009',
        content: 'Emergency ticket just came in - customer can\'t access billing',
        senderName: 'Sarah Kim',
        senderEmail: 'sarah.k@acme.com',
        createdAt: '2026-01-23T11:00:00Z',
      },
    ],
    'announcements': [
      {
        msgId: 'msg_010',
        content: '🎉 Great news! We just hit 1000 tickets resolved this month!',
        senderName: 'Admin User',
        senderEmail: 'admin@acme.com',
        createdAt: '2026-01-23T08:00:00Z',
      },
    ],
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChannel]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    console.log('Sending message to channel:', selectedChannel, messageInput);
    setMessageInput('');
  };

  const handleAddMember = () => {
    if (!newMemberEmail.trim()) return;
    console.log('Adding member to channel:', selectedChannel, newMemberEmail);
    setNewMemberEmail('');
    setShowAddMemberDialog(false);
  };

  const selectedChannelData = channels.find(c => c.id === selectedChannel);
  const channelMessages = selectedChannel ? messages[selectedChannel] || [] : [];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRandomColor = (email) => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-pink-500',
      'bg-indigo-500',
    ];
    const index = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <div className="h-screen bg-[#0e0f0e] w-full flex">
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

      {/* Channels Sidebar */}
      <div className="w-64 border-r border-zinc-800 flex flex-col relative z-10">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800">
          <h1 className="text-white text-xl font-semibold mb-1">Team Chat</h1>
          <p className="text-gray-500 text-xs">Organization channels</p>
        </div>

        {/* Channels List */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="mb-2 px-2">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Channels</p>
          </div>
          {channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => setSelectedChannel(channel.id)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors cursor-pointer mb-1 group",
                selectedChannel === channel.id
                  ? "bg-zinc-900 text-white"
                  : "text-gray-400 hover:text-white hover:bg-zinc-900/50"
              )}
            >
              <Hash size={16} className="flex-shrink-0" />
              <span className="flex-1 text-left text-sm font-medium truncate">{channel.name}</span>
              {channel.unreadCount > 0 && (
                <span className="bg-blue-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                  {channel.unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {selectedChannelData ? (
          <>
            {/* Channel Header */}
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <Hash size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">{selectedChannelData.name}</p>
                  <p className="text-gray-500 text-xs">{selectedChannelData.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 rounded-lg border border-zinc-800">
                  <Users size={14} className="text-gray-400" />
                  <span className="text-gray-400 text-xs">{selectedChannelData.members.length} members</span>
                </div>

                {isOwner && (
                  <Dialog open={showAddMemberDialog} onOpenChange={setShowAddMemberDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="border-zinc-700 text-white cursor-pointer hover:bg-zinc-800">
                        <Plus size={16} className="mr-2" />
                        Add Member
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-zinc-900 border-zinc-800">
                      <DialogHeader>
                        <DialogTitle className="text-white">Add Member to #{selectedChannelData.name}</DialogTitle>
                        <DialogDescription className="text-gray-400">
                          Add a team member to this channel
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label htmlFor="member-email" className="text-gray-400 text-xs mb-2 block">
                            Team Member Email
                          </Label>
                          <Input
                            id="member-email"
                            type="email"
                            placeholder="colleague@acme.com"
                            value={newMemberEmail}
                            onChange={(e) => setNewMemberEmail(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 text-white"
                          />
                        </div>
                        <Button
                          onClick={handleAddMember}
                          disabled={!newMemberEmail}
                          className="w-full bg-white  cursor-pointer text-black hover:bg-gray-200"
                        >
                          Add to Channel
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                <button className="p-2 hover:bg-zinc-900 rounded-lg  cursor-pointer transition-colors">
                  <MoreVertical size={18} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {channelMessages.map((msg, index) => {
                const showHeader = index === 0 ||
                  channelMessages[index - 1].senderEmail !== msg.senderEmail ||
                  new Date(msg.createdAt).getTime() - new Date(channelMessages[index - 1].createdAt).getTime() > 300000; // 5 minutes

                return (
                  <div key={msg.msgId} className="flex gap-3">
                    {showHeader ? (
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm",
                        getRandomColor(msg.senderEmail)
                      )}>
                        {getInitials(msg.senderName)}
                      </div>
                    ) : (
                      <div className="w-10 flex-shrink-0" />
                    )}

                    <div className="flex-1 min-w-0">
                      {showHeader && (
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-white font-semibold text-sm">{msg.senderName}</span>
                          <span className="text-gray-500 text-xs">
                            {new Date(msg.createdAt).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      )}
                      <p className="text-gray-300 text-sm break-words">{msg.content}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-zinc-900 rounded-lg transition-colors">
                  <Paperclip size={20} className="text-gray-400" />
                </button>
                <Input
                  placeholder={`Message #${selectedChannelData.name}`}
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
        ) : null}
      </div>
    </div>
  );
};

export default Messages;
