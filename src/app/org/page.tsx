"use client";

import React, { useState, useRef } from 'react';
import { Building2, Users, Plus, X, Save, Upload, Mail, Crown, Trash2, UserPlus, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const OrganizationPage = () => {
  // Set to true to see organization details view
  const [hasOrganization, setHasOrganization] = useState(false);
  const [isOwner, setIsOwner] = useState(true);
  const bannerInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('create');
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Create form
  const [createForm, setCreateForm] = useState({
    orgName: '',
    orgDescription: '',
    members: [],
    memberInput: '',
  });

  // Join form
  const [joinForm, setJoinForm] = useState({
    orgName: '',
    orgCode: '',
  });

  // Organization data (when user has joined)
  const [organization, setOrganization] = useState({
    _id: '507f1f77bcf86cd799439011',
    orgId: 'org_acme_corp_01',
    orgName: 'Acme Corporation',
    orgDescription: 'Leading provider of AI-powered customer support solutions',
    orgCode: 'ACME-2026',
    widgets: ['wgt_001', 'wgt_002'],
    members: [
      { email: 'john.doe@acme.com', role: 'owner' },
      { email: 'jane.smith@acme.com', role: 'admin' },
      { email: 'mike.johnson@acme.com', role: 'member' },
      { email: 'sarah.williams@acme.com', role: 'member' },
    ],
    agents: ['agt_001', 'agt_002', 'agt_003'],
    datasources: ['ds_001', 'ds_002'],
    bannerUrl: null,
    createdAt: '2026-01-01T10:00:00Z',
    updatedAt: '2026-01-22T14:30:00Z',
  });

  const [bannerPreview, setBannerPreview] = useState(null);

  const handleAddMember = () => {
    const email = createForm.memberInput.trim();
    if (!email || !email.includes('@')) return;
    if (createForm.members.includes(email)) return;

    setCreateForm({
      ...createForm,
      members: [...createForm.members, email],
      memberInput: '',
    });
  };

  const handleRemoveMember = (email) => {
    setCreateForm({
      ...createForm,
      members: createForm.members.filter(m => m !== email),
    });
  };

  const handleCreateOrg = () => {
    console.log('Creating organization:', createForm);
    setHasOrganization(true);
  };

  const handleJoinOrg = () => {
    console.log('Joining organization:', joinForm);
    setHasOrganization(true);
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result);
        setOrganization({ ...organization, bannerUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveOrg = () => {
    console.log('Saving organization:', organization);
  };

  const handleInviteMember = () => {
    if (!inviteEmail.trim() || !inviteEmail.includes('@')) return;

    const newMember = { email: inviteEmail, role: 'member' };
    setOrganization({
      ...organization,
      members: [...organization.members, newMember],
    });
    setInviteEmail('');
    setShowInviteDialog(false);
  };

  const handleRemoveOrgMember = (email) => {
    if (confirm(`Remove ${email} from the organization?`)) {
      setOrganization({
        ...organization,
        members: organization.members.filter(m => m.email !== email),
      });
    }
  };

  const copyOrgCode = () => {
    navigator.clipboard.writeText(organization.orgCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'owner': return 'text-yellow-500';
      case 'admin': return 'text-blue-500';
      default: return 'text-gray-400';
    }
  };

  const getRoleIcon = (role) => {
    if (role === 'owner') return <Crown size={14} className="text-yellow-500" />;
    if (role === 'admin') return <Users size={14} className="text-blue-500" />;
    return null;
  };

  if (!hasOrganization) {
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

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
              <Building2 size={32} className="text-white" />
            </div>
            <h1 className="text-white text-3xl font-semibold mb-2">Organization</h1>
            <p className="text-gray-500">Create a new organization or join an existing one</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 bg-zinc-800 mb-6">
                <TabsTrigger value="create" className="data-[state=active]:bg-zinc-700">
                  Create Organization
                </TabsTrigger>
                <TabsTrigger value="join" className="data-[state=active]:bg-zinc-700">
                  Join Organization
                </TabsTrigger>
              </TabsList>

              <TabsContent value="create" className="space-y-4">
                <div>
                  <Label htmlFor="create-name" className="text-gray-400 text-xs mb-2 block">
                    Organization Name *
                  </Label>
                  <Input
                    id="create-name"
                    placeholder="Acme Corporation"
                    value={createForm.orgName}
                    onChange={(e) => setCreateForm({ ...createForm, orgName: e.target.value })}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="create-desc" className="text-gray-400 text-xs mb-2 block">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="create-desc"
                    placeholder="What does your organization do?"
                    value={createForm.orgDescription}
                    onChange={(e) => setCreateForm({ ...createForm, orgDescription: e.target.value })}
                    className="bg-zinc-800 border-zinc-700 text-white min-h-[80px]"
                  />
                </div>

                <div>
                  <Label className="text-gray-400 text-xs mb-2 block">
                    Team Members (Optional)
                  </Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="colleague@example.com"
                      value={createForm.memberInput}
                      onChange={(e) => setCreateForm({ ...createForm, memberInput: e.target.value })}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddMember()}
                      className="bg-zinc-800 border-zinc-700 text-white flex-1"
                    />
                    <Button
                      onClick={handleAddMember}
                      disabled={!createForm.memberInput.trim()}
                      className="bg-white text-black hover:bg-gray-200"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>

                  {createForm.members.length > 0 && (
                    <div className="space-y-2">
                      {createForm.members.map((email) => (
                        <div key={email} className="flex items-center justify-between p-2 bg-zinc-800 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="text-gray-500" />
                            <span className="text-white text-sm">{email}</span>
                          </div>
                          <button
                            onClick={() => handleRemoveMember(email)}
                            className="text-red-500 hover:text-red-400"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleCreateOrg}
                  disabled={!createForm.orgName.trim()}
                  className="w-full bg-white text-black hover:bg-gray-200"
                >
                  Create Organization
                </Button>
              </TabsContent>

              <TabsContent value="join" className="space-y-4">
                <div>
                  <Label htmlFor="join-name" className="text-gray-400 text-xs mb-2 block">
                    Organization Name *
                  </Label>
                  <Input
                    id="join-name"
                    placeholder="Enter organization name"
                    value={joinForm.orgName}
                    onChange={(e) => setJoinForm({ ...joinForm, orgName: e.target.value })}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="join-code" className="text-gray-400 text-xs mb-2 block">
                    Organization Code *
                  </Label>
                  <Input
                    id="join-code"
                    placeholder="Enter invite code"
                    value={joinForm.orgCode}
                    onChange={(e) => setJoinForm({ ...joinForm, orgCode: e.target.value })}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Ask your organization admin for the invite code
                  </p>
                </div>

                <Button
                  onClick={handleJoinOrg}
                  disabled={!joinForm.orgName.trim() || !joinForm.orgCode.trim()}
                  className="w-full bg-white text-black hover:bg-gray-200"
                >
                  Join Organization
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-2xl font-semibold mb-1">Organization Settings</h1>
          <p className="text-gray-500 text-sm">Manage your organization details and members</p>
        </div>

        {/* Banner Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden mb-6">
          <div className="relative h-48 bg-zinc-800">
            {organization.bannerUrl || bannerPreview ? (
              <img
                src={organization.bannerUrl || bannerPreview}
                alt="Organization banner"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Building2 size={48} className="text-gray-600" />
              </div>
            )}
            {isOwner && (
              <div className="absolute bottom-4 right-4">
                <Button
                  onClick={() => bannerInputRef.current?.click()}
                  size="sm"
                  className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 border border-white/20"
                >
                  <Upload size={14} className="mr-2" />
                  Change Banner
                </Button>
                <input
                  ref={bannerInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>

        {/* Organization Details */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-lg font-semibold">Organization Details</h2>
            {isOwner && (
              <Button onClick={handleSaveOrg} className="bg-white text-black hover:bg-gray-200">
                <Save size={16} className="mr-2" />
                Save Changes
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="org-name" className="text-gray-400 text-xs mb-2 block">
                Organization Name
              </Label>
              <Input
                id="org-name"
                value={organization.orgName}
                onChange={(e) => setOrganization({ ...organization, orgName: e.target.value })}
                disabled={!isOwner}
                className="bg-zinc-800 border-zinc-700 text-white disabled:opacity-50"
              />
            </div>

            <div>
              <Label htmlFor="org-desc" className="text-gray-400 text-xs mb-2 block">
                Description
              </Label>
              <Textarea
                id="org-desc"
                value={organization.orgDescription}
                onChange={(e) => setOrganization({ ...organization, orgDescription: e.target.value })}
                disabled={!isOwner}
                className="bg-zinc-800 border-zinc-700 text-white min-h-[80px] disabled:opacity-50"
              />
            </div>

            <div>
              <Label className="text-gray-400 text-xs mb-2 block">
                Organization Code
              </Label>
              <div className="flex gap-2">
                <Input
                  value={organization.orgCode}
                  disabled
                  className="bg-zinc-800 border-zinc-700 text-white opacity-50 flex-1"
                />
                <Button
                  onClick={copyOrgCode}
                  variant="outline"
                  className="border-zinc-700 text-white hover:bg-zinc-800"
                >
                  {copiedCode ? <Check size={16} /> : <Copy size={16} />}
                </Button>
              </div>
              <p className="text-gray-500 text-xs mt-1">
                Share this code with team members to invite them
              </p>
            </div>
          </div>
        </div>

        {/* Members Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-white" />
              <h2 className="text-white text-lg font-semibold">Members</h2>
              <span className="text-gray-500 text-sm">({organization.members.length})</span>
            </div>
            {isOwner && (
              <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-white text-black hover:bg-gray-200">
                    <UserPlus size={16} className="mr-2" />
                    Invite Member
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-zinc-900 border-zinc-800">
                  <DialogHeader>
                    <DialogTitle className="text-white">Invite Team Member</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Add a new member to your organization
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="invite-email" className="text-gray-400 text-xs mb-2 block">
                        Email Address
                      </Label>
                      <Input
                        id="invite-email"
                        type="email"
                        placeholder="colleague@example.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="bg-zinc-800 border-zinc-700 text-white"
                      />
                    </div>
                    <Button
                      onClick={handleInviteMember}
                      disabled={!inviteEmail.trim()}
                      className="w-full bg-white text-black hover:bg-gray-200"
                    >
                      Send Invitation
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="space-y-2">
            {organization.members.map((member) => (
              <div
                key={member.email}
                className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg hover:bg-zinc-800/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-700 border border-zinc-600 flex items-center justify-center text-white font-semibold text-sm">
                    {member.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{member.email}</p>
                    <div className="flex items-center gap-2">
                      <p className={cn("text-xs capitalize", getRoleColor(member.role))}>
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getRoleIcon(member.role)}
                  {isOwner && member.role !== 'owner' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveOrgMember(member.email)}
                      className="text-red-500 hover:text-red-400 hover:bg-red-950"
                    >
                      <Trash2 size={14} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationPage;
