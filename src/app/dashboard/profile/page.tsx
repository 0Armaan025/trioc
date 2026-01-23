"use client";

import React, { useState } from 'react';
import { Camera, Mail, User, Lock, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';

const Profile = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [username, setUsername] = useState('johndoe');
  const [profileImage, setProfileImage] = useState<any>(null);

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {

    {/* TODO: FIX THIS*/ }
    alert('saveed');
  };

  const handlePasswordChange = () => {
    console.log('Request password change...');
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

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-2xl font-semibold mb-1">Profile</h1>
          <p className="text-gray-500 text-sm">Manage your account settings</p>
        </div>

        {/* Profile Picture Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-4">
          <Label className="text-white text-sm font-medium mb-4 block">Profile Picture</Label>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-white font-semibold text-2xl overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  'JD'
                )}
              </div>

              <label
                htmlFor="profile-upload"
                className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera size={24} className="text-white" />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div>
              <p className="text-white text-sm font-medium mb-1">Change avatar</p>
              <p className="text-gray-500 text-xs">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-4">
          <h2 className="text-white text-sm font-medium mb-4">Personal Information</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-400 text-xs mb-2 block">
                Full Name
              </Label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-zinc-800 border-zinc-700 text-white focus:border-zinc-600"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="username" className="text-gray-400 text-xs mb-2 block">
                Username
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white focus:border-zinc-600"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-400 text-xs mb-2 block">
                Email Address
              </Label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-zinc-800 border-zinc-700 text-white focus:border-zinc-600"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleSaveProfile}
              className="bg-white text-black hover:bg-gray-200"
            >
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-white text-sm font-medium mb-4">Security</h2>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <Lock size={18} className="text-gray-400" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Password</p>
                <p className="text-gray-500 text-xs">Last changed 3 months ago</p>
              </div>
            </div>

            <Button
              onClick={handlePasswordChange}
              variant="outline"
              className="border-zinc-700 text-white hover:bg-zinc-800"
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
