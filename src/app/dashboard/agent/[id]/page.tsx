"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Bot, Clock, Trash2, Settings, Play, Pause, Database, ExternalLink, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const AgentDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const agentId = params?.id;

  const [availableDataSources] = useState([
    { id: 'ds_faq_001', name: 'FAQ Database' },
    { id: 'ds_docs_002', name: 'Documentation' },
    { id: 'ds_products_001', name: 'Product Catalog' },
    { id: 'ds_knowledge_003', name: 'Knowledge Base' },
    { id: 'ds_tickets_004', name: 'Support Tickets' }
  ]);


  // don't worry, we will replace this with a real database after a while


  const [agent, setAgent] = useState({
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
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedDataSource, setSelectedDataSource] = useState('');
  const [widgetLink, setWidgetLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    console.log('Saving agent:', agent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this agent?')) {
      console.log('Deleting agent:', agentId);
      router.back();
      // this is mroe suitable than router.push() or something else
    }
  };

  const toggleStatus = () => {
    setAgent(prev => ({
      ...prev,
      status: prev.status === 'active' ? 'disabled' : 'active'
    }));
  };

  const addDataSource = () => {
    if (selectedDataSource && !agent.dataSources.includes(selectedDataSource)) {
      setAgent(prev => ({
        ...prev,
        dataSources: [...prev.dataSources, selectedDataSource]
      }));
      setSelectedDataSource('');
    }
  };

  const removeDataSource = (dsId) => {
    setAgent(prev => ({
      ...prev,
      dataSources: prev.dataSources.filter(id => id !== dsId)
    }));
  };

  const generateWidgetLink = () => {
    const link = `https://widget.yourapp.com/embed?agent=${agent.agentId}`;
    setWidgetLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(widgetLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDataSourceName = (dsId) => {
    return availableDataSources.find(ds => ds.id === dsId)?.name || dsId;
  };

  return (
    <div className="min-h-screen bg-[#0e0f0e] p-6 lg:p-8 w-full">

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2  cursor-pointer text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Back to Agents</span>
        </button>

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <Bot size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-white text-2xl font-semibold mb-1">{agent.agentName}</h1>
              <p className="text-gray-500 text-sm">
                Created by {agent.createdBy} • {new Date(agent.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-zinc-700 text-white hover:bg-zinc-800 cursor-pointer hover:text-white"
                  onClick={generateWidgetLink}
                >
                  <ExternalLink size={16} className="mr-2" />
                  Get Widget
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-900 border-zinc-800">
                <DialogHeader>
                  <DialogTitle className="text-white">Widget Link</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Use this link to embed the agent on your website
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="flex gap-2">
                    <Input
                      value={widgetLink}
                      readOnly
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                    <Button
                      onClick={copyToClipboard}
                      className="bg-white text-black hover:bg-gray-200"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </Button>
                  </div>
                  <div className="bg-zinc-800 p-4 rounded-lg">
                    <code className="text-xs text-gray-300 break-all">
                      {`<script src="${widgetLink}"></script>`}
                    </code>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              className="border-zinc-700 text-white hover:bg-zinc-800 hover:text-white cursor-pointer"
              onClick={toggleStatus}
            >
              {agent.status === 'active' ? (
                <>
                  <Pause size={16} className="mr-2" />
                  Disable
                </>
              ) : (
                <>
                  <Play size={16} className="mr-2" />
                  Activate
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="border-red-900 text-red-500 hover:bg-red-950 hover:text-white cursor-pointer"
              onClick={handleDelete}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>

        {/* Configuration Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-lg font-semibold">Configuration</h2>
            {!isEditing ? (
              <Button
                variant="outline"
                className="border-zinc-700 text-white hover:bg-zinc-800 cursor-pointer  hover:text-white"
                onClick={() => setIsEditing(true)}
              >
                <Settings size={16} className="mr-2" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-zinc-700 text-white hover:bg-zinc-800 hover:text-white hover:cursor-pointer"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-white text-black hover:bg-gray-200 cursor-pointer"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="agent-id" className="text-gray-400 text-xs mb-2 block">
                  Agent ID
                </Label>
                <Input
                  id="agent-id"
                  value={agent.agentId}
                  disabled
                  className="bg-zinc-800 border-zinc-700 text-gray-500 opacity-50"
                />
              </div>

              <div>
                <Label htmlFor="agent-role" className="text-gray-400 text-xs mb-2 block">
                  Agent Role
                </Label>
                <Select
                  value={agent.agentRole}
                  onValueChange={(value) => setAgent({ ...agent, agentRole: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="support" className="text-white">Support</SelectItem>
                    <SelectItem value="sales" className="text-white">Sales</SelectItem>
                    <SelectItem value="explain" className="text-white">Explain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="agent-name" className="text-gray-400 text-xs mb-2 block">
                Agent Name
              </Label>
              <Input
                id="agent-name"
                value={agent.agentName}
                onChange={(e) => setAgent({ ...agent, agentName: e.target.value })}
                disabled={!isEditing}
                className="bg-zinc-800 border-zinc-700 text-white focus:border-zinc-600 disabled:opacity-50"
              />
            </div>

            <div>
              <Label htmlFor="agent-description" className="text-gray-400 text-xs mb-2 block">
                Description
              </Label>
              <Textarea
                id="agent-description"
                value={agent.agentDescription}
                onChange={(e) => setAgent({ ...agent, agentDescription: e.target.value })}
                disabled={!isEditing}
                className="bg-zinc-800 border-zinc-700 text-white focus:border-zinc-600 disabled:opacity-50 min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="temperature" className="text-gray-400 text-xs mb-2 block">
                Temperature ({agent.temperature})
              </Label>
              <input
                id="temperature"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={agent.temperature}
                onChange={(e) => setAgent({ ...agent, temperature: parseFloat(e.target.value) })}
                disabled={!isEditing}
                className="w-full accent-white disabled:opacity-50"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Precise</span>
                <span>Creative</span>
              </div>
            </div>

            <div>
              <Label className="text-gray-400 text-xs mb-2 block">
                Status
              </Label>
              <div className={cn(
                "inline-flex px-3 py-1.5 rounded-full text-sm font-medium",
                agent.status === 'active'
                  ? "bg-green-500/10 text-green-500 border border-green-500/20"
                  : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
              )}>
                {agent.status}
              </div>
            </div>
          </div>
        </div>

        {/* Data Sources Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Database size={20} className="text-white" />
              <h2 className="text-white text-lg font-semibold">Data Sources</h2>
            </div>
          </div>

          {/* Add Data Source */}
          {isEditing && (
            <div className="flex gap-2 mb-4">
              <Select value={selectedDataSource} onValueChange={setSelectedDataSource}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white flex-1">
                  <SelectValue placeholder="Select a data source" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  {availableDataSources
                    .filter(ds => !agent.dataSources.includes(ds.id))
                    .map(ds => (
                      <SelectItem key={ds.id} value={ds.id} className="text-white">
                        {ds.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button
                onClick={addDataSource}
                disabled={!selectedDataSource}
                className="bg-white text-black hover:bg-gray-200 hover:text-black cursor-pointer transition-all"
              >
                Add
              </Button>
            </div>
          )}

          {/* Data Sources List */}
          <div className="space-y-2">
            {agent.dataSources.length === 0 ? (
              <p className="text-gray-500 text-sm py-4 text-center">No data sources added</p>
            ) : (
              agent.dataSources.map((dsId) => (
                <div
                  key={dsId}
                  className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg"
                >
                  <span className="text-white text-sm">{getDataSourceName(dsId)}</span>
                  {isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDataSource(dsId)}
                      className="text-red-500 hover:bg-red-950 cursor-pointer hover:text-gray-200  transition-all"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailPage;
