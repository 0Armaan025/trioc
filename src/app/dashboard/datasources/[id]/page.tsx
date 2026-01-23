"use client";

import React, { useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Database, Save, Trash2, Plus, X, Link2, Upload, FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const DataSourceDetail = () => {
  const params = useParams();
  const router = useRouter();
  const fileInputRef = useRef(null);
  const dataSourceId = params?.id;

  const [dataSource, setDataSource] = useState({
    _id: '507f1f77bcf86cd799439011',
    dataSourceId: 'ds_faq_001',
    name: 'FAQ Database',
    content: 150,
    learnedContent: 142,
    extraContent: 8,
    createdBy: 'john.doe@acme.com',
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-22T14:30:00Z',
  });

  const [links, setLinks] = useState([
    { id: 1, url: 'https://docs.example.com/faq', status: 'active' },
    { id: 2, url: 'https://support.example.com/help', status: 'active' },
    { id: 3, url: 'https://kb.example.com/articles', status: 'active' },
  ]);

  const [documents, setDocuments] = useState([
    { id: 1, name: 'faq_general.txt', size: '45 KB', uploadedAt: '2026-01-15T10:00:00Z' },
    { id: 2, name: 'support_guide.csv', size: '128 KB', uploadedAt: '2026-01-18T14:30:00Z' },
  ]);

  const [newLink, setNewLink] = useState('');

  const handleAddLink = () => {
    if (!newLink.trim()) return;
    if (links.length >= 5) {
      alert('Maximum 5 links allowed');
      return;
    }

    setLinks([...links, {
      id: Date.now(),
      url: newLink,
      status: 'active'
    }]);
    setNewLink('');
  };

  const handleRemoveLink = (id) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file =>
      file.name.endsWith('.txt') || file.name.endsWith('.csv')
    );

    if (validFiles.length === 0) {
      alert('Only .txt and .csv files are allowed');
      return;
    }

    const newDocs = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: `${(file.size / 1024).toFixed(0)} KB`,
      uploadedAt: new Date().toISOString(),
    }));

    setDocuments([...documents, ...newDocs]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleSave = () => {
    console.log('Saving data source:', {
      ...dataSource,
      links,
      documents,
    });
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${dataSource.name}"?`)) {
      console.log('Deleting data source:', dataSourceId);
      router.push('/dashboard/datasources');
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

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Back to Data Sources</span>
        </button>

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <Database size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-white text-2xl font-semibold mb-1">{dataSource.name}</h1>
              <p className="text-gray-500 text-sm">
                Created by {dataSource.createdBy} • {new Date(dataSource.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleSave}
              className="bg-white text-black hover:bg-gray-200"
            >
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
            <Button
              variant="outline"
              className="border-red-900 text-red-500 hover:bg-red-950"
              onClick={handleDelete}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <p className="text-gray-400 text-xs mb-1">Total Content</p>
            <p className="text-white text-2xl font-semibold">{dataSource.content}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <p className="text-gray-400 text-xs mb-1">Learned Content</p>
            <p className="text-white text-2xl font-semibold">{dataSource.learnedContent}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <p className="text-gray-400 text-xs mb-1">Extra Content</p>
            <p className="text-white text-2xl font-semibold">{dataSource.extraContent}</p>
          </div>
        </div>

        {/* Name Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-4">
          <h2 className="text-white text-lg font-semibold mb-4">Details</h2>
          <div>
            <Label htmlFor="ds-name" className="text-gray-400 text-xs mb-2 block">
              Data Source Name
            </Label>
            <Input
              id="ds-name"
              value={dataSource.name}
              onChange={(e) => setDataSource({ ...dataSource, name: e.target.value })}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
        </div>

        {/* Links Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Link2 size={20} className="text-white" />
              <h2 className="text-white text-lg font-semibold">Links</h2>
              <span className="text-gray-500 text-sm">({links.length}/5)</span>
            </div>
          </div>

          {/* Add Link */}
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="https://example.com/your-content"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddLink()}
              disabled={links.length >= 5}
              className="bg-zinc-800 border-zinc-700 text-white flex-1"
            />
            <Button
              onClick={handleAddLink}
              disabled={!newLink.trim() || links.length >= 5}
              className="bg-white text-black hover:bg-gray-200"
            >
              <Plus size={16} className="mr-2" />
              Add Link
            </Button>
          </div>

          {/* Links List */}
          <div className="space-y-2">
            {links.length === 0 ? (
              <p className="text-gray-500 text-sm py-4 text-center">No links added yet</p>
            ) : (
              links.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <ExternalLink size={16} className="text-gray-500 flex-shrink-0" />
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-sm hover:text-blue-400 transition-colors truncate"
                    >
                      {link.url}
                    </a>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveLink(link.id)}
                    className="text-red-500 hover:text-red-400 hover:bg-red-950 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText size={20} className="text-white" />
              <h2 className="text-white text-lg font-semibold">Documents</h2>
              <span className="text-gray-500 text-sm">(.txt, .csv only)</span>
            </div>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-white text-black hover:bg-gray-200"
            >
              <Upload size={16} className="mr-2" />
              Upload Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.csv"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Documents List */}
          <div className="space-y-2">
            {documents.length === 0 ? (
              <p className="text-gray-500 text-sm py-4 text-center">No documents uploaded yet</p>
            ) : (
              documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg group"
                >
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-gray-500" />
                    <div>
                      <p className="text-white text-sm font-medium">{doc.name}</p>
                      <p className="text-gray-500 text-xs">
                        {doc.size} · Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveDocument(doc.id)}
                    className="text-red-500 hover:text-red-400 hover:bg-red-950 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSourceDetail;
