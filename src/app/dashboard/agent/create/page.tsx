"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bot, Database, Save, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const CreateAgent = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    agentName: '',
    agentDescription: '',
    agentRole: '',
    temperature: 0.7,
    dataSources: [],
  });

  const [selectedDataSource, setSelectedDataSource] = useState('');
  const [errors, setErrors] = useState({});

  // Mock available data sources
  const [availableDataSources] = useState([
    { id: 'ds_faq_001', name: 'FAQ Database' },
    { id: 'ds_docs_002', name: 'Product Documentation' },
    { id: 'ds_products_001', name: 'Product Catalog' },
    { id: 'ds_knowledge_003', name: 'Knowledge Base' },
    { id: 'ds_tickets_004', name: 'Support Tickets' },
  ]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.agentName.trim()) {
      newErrors.agentName = 'Agent name is required';
    }

    if (!formData.agentDescription.trim()) {
      newErrors.agentDescription = 'Description is required';
    }

    if (!formData.agentRole) {
      newErrors.agentRole = 'Please select an agent role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (!validateForm()) return;

    console.log('Creating agent:', formData);
    // Navigate to agents page after creation
    router.push('/dashboard/agents');
  };

  const addDataSource = () => {
    if (selectedDataSource && !formData.dataSources.includes(selectedDataSource)) {
      setFormData(prev => ({
        ...prev,
        dataSources: [...prev.dataSources, selectedDataSource]
      }));
      setSelectedDataSource('');
    }
  };

  const removeDataSource = (dsId) => {
    setFormData(prev => ({
      ...prev,
      dataSources: prev.dataSources.filter(id => id !== dsId)
    }));
  };

  const getDataSourceName = (dsId) => {
    return availableDataSources.find(ds => ds.id === dsId)?.name || dsId;
  };

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

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Back to Agents</span>
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="w-16 h-16 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <Bot size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-white text-2xl font-semibold mb-1">Create New Agent</h1>
            <p className="text-gray-500 text-sm">Configure your AI agent to handle customer interactions</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={20} className="text-white" />
              <h2 className="text-white text-lg font-semibold">Basic Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="agent-name" className="text-gray-400 text-xs mb-2 block">
                  Agent Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="agent-name"
                  placeholder="e.g., Customer Support Bot"
                  value={formData.agentName}
                  onChange={(e) => {
                    setFormData({ ...formData, agentName: e.target.value });
                    setErrors({ ...errors, agentName: '' });
                  }}
                  className={cn(
                    "bg-zinc-800 border-zinc-700 text-white",
                    errors.agentName && "border-red-500"
                  )}
                />
                {errors.agentName && (
                  <p className="text-red-500 text-xs mt-1">{errors.agentName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="agent-description" className="text-gray-400 text-xs mb-2 block">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="agent-description"
                  placeholder="Describe what this agent does and how it helps customers..."
                  value={formData.agentDescription}
                  onChange={(e) => {
                    setFormData({ ...formData, agentDescription: e.target.value });
                    setErrors({ ...errors, agentDescription: '' });
                  }}
                  className={cn(
                    "bg-zinc-800 border-zinc-700 text-white min-h-[100px]",
                    errors.agentDescription && "border-red-500"
                  )}
                />
                {errors.agentDescription && (
                  <p className="text-red-500 text-xs mt-1">{errors.agentDescription}</p>
                )}
              </div>

              <div>
                <Label htmlFor="agent-role" className="text-gray-400 text-xs mb-2 block">
                  Agent Role <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.agentRole}
                  onValueChange={(value) => {
                    setFormData({ ...formData, agentRole: value });
                    setErrors({ ...errors, agentRole: '' });
                  }}
                >
                  <SelectTrigger className={cn(
                    "bg-zinc-800 border-zinc-700 text-white",
                    errors.agentRole && "border-red-500"
                  )}>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="support" className="text-white">
                      Support - Handle customer inquiries and issues
                    </SelectItem>
                    <SelectItem value="sales" className="text-white">
                      Sales - Assist with product information and purchases
                    </SelectItem>
                    <SelectItem value="explain" className="text-white">
                      Explain - Provide detailed explanations and tutorials
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.agentRole && (
                  <p className="text-red-500 text-xs mt-1">{errors.agentRole}</p>
                )}
              </div>
            </div>
          </div>

          {/* AI Configuration */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Zap size={20} className="text-white" />
              <h2 className="text-white text-lg font-semibold">AI Configuration</h2>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="temperature" className="text-gray-400 text-xs">
                  Temperature
                </Label>
                <span className="text-white text-sm font-medium">{formData.temperature}</span>
              </div>
              <input
                id="temperature"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
                className="w-full accent-white"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0.0 - Precise & Consistent</span>
                <span>1.0 - Creative & Varied</span>
              </div>
              <p className="text-gray-500 text-xs mt-3">
                Lower values make the agent more focused and deterministic. Higher values make it more creative but less predictable.
              </p>
            </div>
          </div>

          {/* Data Sources */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Database size={20} className="text-white" />
              <h2 className="text-white text-lg font-semibold">Data Sources</h2>
            </div>

            <div className="space-y-4">
              <p className="text-gray-400 text-sm">
                Select data sources that this agent can use to answer customer questions.
              </p>

              {/* Add Data Source */}
              <div className="flex gap-2">
                <Select value={selectedDataSource} onValueChange={setSelectedDataSource}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white flex-1">
                    <SelectValue placeholder="Select a data source" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    {availableDataSources
                      .filter(ds => !formData.dataSources.includes(ds.id))
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
                  className="bg-white text-black hover:bg-gray-200"
                >
                  Add
                </Button>
              </div>

              {/* Data Sources List */}
              <div className="space-y-2">
                {formData.dataSources.length === 0 ? (
                  <div className="text-center py-8">
                    <Database size={32} className="text-gray-600 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No data sources added yet</p>
                    <p className="text-gray-600 text-xs mt-1">Add data sources to help your agent answer questions</p>
                  </div>
                ) : (
                  formData.dataSources.map((dsId) => (
                    <div
                      key={dsId}
                      className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Database size={16} className="text-gray-500" />
                        <span className="text-white text-sm">{getDataSourceName(dsId)}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDataSource(dsId)}
                        className="text-red-500 hover:text-red-400 hover:bg-red-950"
                      >
                        Remove
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="border-zinc-700 text-white hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              className="bg-white text-black hover:bg-gray-200"
            >
              <Save size={16} className="mr-2" />
              Create Agent
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAgent;
