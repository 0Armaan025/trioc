"use client";

import React, { useState } from 'react';
import { Plus, Database, Eye, Pencil, Trash2, MoreVertical, FileText, Link2, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const DataSources = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newDataSourceName, setNewDataSourceName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const [dataSources, setDataSources] = useState([
    {
      _id: '507f1f77bcf86cd799439011',
      dataSourceId: 'ds_faq_001',
      name: 'FAQ Database',
      content: 150,
      learnedContent: 142,
      extraContent: 8,
      createdBy: 'john.doe@acme.com',
      createdAt: '2026-01-10T10:00:00Z',
      updatedAt: '2026-01-22T14:30:00Z',
      links: 3,
      documents: 2,
    },
    {
      _id: '507f1f77bcf86cd799439012',
      dataSourceId: 'ds_docs_002',
      name: 'Product Documentation',
      content: 85,
      learnedContent: 80,
      extraContent: 5,
      createdBy: 'jane.smith@acme.com',
      createdAt: '2026-01-15T11:30:00Z',
      updatedAt: '2026-01-23T09:15:00Z',
      links: 5,
      documents: 1,
    },
    {
      _id: '507f1f77bcf86cd799439013',
      dataSourceId: 'ds_products_001',
      name: 'Product Catalog',
      content: 200,
      learnedContent: 195,
      extraContent: 5,
      createdBy: 'admin@acme.com',
      createdAt: '2026-01-05T08:00:00Z',
      updatedAt: '2026-01-20T16:45:00Z',
      links: 2,
      documents: 3,
    },
    {
      _id: '507f1f77bcf86cd799439014',
      dataSourceId: 'ds_knowledge_003',
      name: 'Knowledge Base',
      content: 320,
      learnedContent: 310,
      extraContent: 10,
      createdBy: 'john.doe@acme.com',
      createdAt: '2025-12-28T09:00:00Z',
      updatedAt: '2026-01-21T11:20:00Z',
      links: 4,
      documents: 5,
    },
  ]);

  const handleCreate = () => {
    if (!newDataSourceName.trim()) return;
    console.log('Creating data source:', newDataSourceName);
    setNewDataSourceName('');
    setShowCreateDialog(false);
  };

  const handleEdit = (ds) => {
    setEditingId(ds._id);
    setEditName(ds.name);
  };

  const handleSaveEdit = (id) => {
    setDataSources(prev => prev.map(ds =>
      ds._id === id ? { ...ds, name: editName } : ds
    ));
    setEditingId(null);
  };

  const handleDelete = (id, name) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      setDataSources(prev => prev.filter(ds => ds._id !== id));
      console.log('Deleting data source:', id);
    }
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-2xl font-semibold mb-1">Data Sources</h1>
            <p className="text-gray-500 text-sm">
              {dataSources.length} {dataSources.length === 1 ? 'source' : 'sources'} total
            </p>
          </div>

          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-white text-black hover:bg-gray-200">
                <Plus size={18} className="mr-2" />
                Create Data Source
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-zinc-800">
              <DialogHeader>
                <DialogTitle className="text-white">Create Data Source</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Create a new data source for your agents
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Input
                  placeholder="Data source name"
                  value={newDataSourceName}
                  onChange={(e) => setNewDataSourceName(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
                <Button
                  onClick={handleCreate}
                  disabled={!newDataSourceName.trim()}
                  className="w-full bg-white text-black hover:bg-gray-200"
                >
                  Create
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table View */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-800 border-b border-zinc-700">
                <tr>
                  <th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wider px-6 py-4">
                    Name
                  </th>
                  <th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wider px-6 py-4">
                    Content
                  </th>
                  <th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wider px-6 py-4">
                    Sources
                  </th>
                  <th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wider px-6 py-4">
                    Created By
                  </th>
                  <th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wider px-6 py-4">
                    Last Updated
                  </th>
                  <th className="text-right text-gray-400 text-xs font-semibold uppercase tracking-wider px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {dataSources.map((ds) => (
                  <tr key={ds._id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4">
                      {editingId === ds._id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 text-white h-8 text-sm"
                            autoFocus
                          />
                          <Button
                            size="sm"
                            onClick={() => handleSaveEdit(ds._id)}
                            className="bg-white text-black hover:bg-gray-200 h-8"
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingId(null)}
                            className="text-gray-400 hover:text-white h-8"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                            <Database size={16} className="text-white" />
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">{ds.name}</p>
                            <p className="text-gray-500 text-xs">{ds.dataSourceId}</p>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white text-sm font-medium">{ds.content} items</p>
                        <p className="text-gray-500 text-xs">
                          {ds.learnedContent} learned · {ds.extraContent} extra
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Link2 size={14} className="text-gray-500" />
                          <span className="text-gray-400 text-sm">{ds.links}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText size={14} className="text-gray-500" />
                          <span className="text-gray-400 text-sm">{ds.documents}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-400 text-sm">{ds.createdBy}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-500" />
                        <span className="text-gray-400 text-sm">
                          {new Date(ds.updatedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/dashboard/datasources/${ds.dataSourceId}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white hover:bg-zinc-800"
                          >
                            <Eye size={16} className="mr-2" />
                            View
                          </Button>
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-white hover:bg-zinc-800"
                            >
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-zinc-800 border-zinc-700">
                            <DropdownMenuItem
                              onClick={() => handleEdit(ds)}
                              className="text-white hover:bg-zinc-700 cursor-pointer"
                            >
                              <Pencil size={14} className="mr-2" />
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(ds._id, ds.name)}
                              className="text-red-500 hover:bg-red-950 cursor-pointer"
                            >
                              <Trash2 size={14} className="mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {dataSources.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
              <Database size={32} className="text-gray-500" />
            </div>
            <h3 className="text-white text-lg font-medium mb-2">No data sources yet</h3>
            <p className="text-gray-500 text-sm mb-6">Create your first data source to get started</p>
            <Button className="bg-white text-black hover:bg-gray-200">
              <Plus size={18} className="mr-2" />
              Create Data Source
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataSources;
