"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Lock,
  Shield,
  LogOut,
  Trash2,
  Camera,
  Save,
  X,
  Eye,
  EyeOff,
  Loader2,
  Settings,
  Bell,
  Globe,
  Smartphone,
  Key,
  AlertTriangle,
} from "lucide-react";

import Modal from "@/components/ui/modal";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

export default function ProfilePage({ mainUser }) {
  const [user, setUser] = useState(mainUser);
  const [loading, setLoading] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] =
    useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState(user.notifications);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
      toast.success("Successfully logged out");
    } catch (error) {
      toast.error("Failed to logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8 backdrop-blur-xl bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border border-blue-500/30 shadow-lg">
                  <User className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                    Profile Settings
                  </h1>
                  <p className="text-slate-300 text-sm sm:text-base lg:text-lg mt-1">
                    Manage your account and preferences
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 sm:mb-8 backdrop-blur-xl bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 shadow-2xl">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col items-center sm:items-start">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="w-full h-full rounded-2xl object-cover"
                      />
                    ) : (
                      <User className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
                    )}
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110">
                    <Camera className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {user.name}
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm sm:text-base">{user.email}</span>
                  </div>
                </div>
                {user.bio && (
                  <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                    {user.bio}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="backdrop-blur-xl bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <Edit3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Edit Profile
                  </h3>
                  <p className="text-xs text-slate-400">Update your details</p>
                </div>
              </div>
              <button
                onClick={() => toast.success("Coming soon!")}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-sm"
              >
                Edit Details
              </button>
            </div>

            <div className="backdrop-blur-xl bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Password</h3>
                  <p className="text-xs text-slate-400">Update your password</p>
                </div>
              </div>
              <button
                onClick={() => toast.success("Coming soon!")}
                className="w-full px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 text-sm"
              >
                Change Password
              </button>
            </div>

            <div className="backdrop-blur-xl bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Notifications
                  </h3>
                  <p className="text-xs text-slate-400">Manage preferences</p>
                </div>
              </div>
              <button
                onClick={() => toast.success("Coming soon!")}
                className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 text-sm"
              >
                Settings
              </button>
            </div>

            <div className="backdrop-blur-xl bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Key className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Reset Password
                  </h3>
                  <p className="text-xs text-slate-400">Email reset link</p>
                </div>
              </div>
              <button
                onClick={() => toast.success("Coming soon!")}
                disabled={false}
                className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 text-sm disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {false ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Send Reset Email
              </button>
            </div>

            <div className="backdrop-blur-xl bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center shadow-lg">
                  <LogOut className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Logout</h3>
                  <p className="text-xs text-slate-400">Sign out of account</p>
                </div>
              </div>
              <button
                onClick={() => handleLogout()}
                disabled={loading}
                className="w-full px-4 py-2 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-slate-500/25 transition-all duration-300 text-sm disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Sign Out
              </button>
            </div>

            <div className="backdrop-blur-xl bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-red-500/30 hover:bg-red-500/10 transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                  <Trash2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Delete Account
                  </h3>
                  <p className="text-xs text-red-400">Permanently remove</p>
                </div>
              </div>
              <button
                onClick={() => toast.success("Coming soon!")}
                className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 text-sm"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showEditProfile} onClose={() => setShowEditProfile(false)}>
        <div className="backdrop-blur-xl bg-slate-900/95 rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl">
          <div className="p-4 sm:p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Edit Profile
            </h2>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="w-full px-3 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) =>
                    setEditForm({ ...editForm, location: e.target.value })
                  }
                  className="w-full px-3 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Bio
              </label>
              <textarea
                value={editForm.bio}
                onChange={(e) =>
                  setEditForm({ ...editForm, bio: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 resize-none text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Timezone
                </label>
                <select
                  value={editForm.timezone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, timezone: e.target.value })
                  }
                  className="w-full px-3 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-sm"
                >
                  <option value="America/Los_Angeles" className="bg-slate-800">
                    Pacific Time
                  </option>
                  <option value="America/New_York" className="bg-slate-800">
                    Eastern Time
                  </option>
                  <option value="America/Chicago" className="bg-slate-800">
                    Central Time
                  </option>
                  <option value="America/Denver" className="bg-slate-800">
                    Mountain Time
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Language
                </label>
                <select
                  value={editForm.language}
                  onChange={(e) =>
                    setEditForm({ ...editForm, language: e.target.value })
                  }
                  className="w-full px-3 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-sm"
                >
                  <option value="English" className="bg-slate-800">
                    English
                  </option>
                  <option value="Spanish" className="bg-slate-800">
                    Spanish
                  </option>
                  <option value="French" className="bg-slate-800">
                    French
                  </option>
                  <option value="German" className="bg-slate-800">
                    German
                  </option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => toast.success("Coming soon!")}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save Changes
              </button>
              <button
                onClick={() => setShowEditProfile(false)}
                className="flex-1 px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 text-slate-300 rounded-lg font-medium hover:bg-white/20 hover:text-white transition-all duration-300 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        show={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      >
        <div className="backdrop-blur-xl bg-slate-900/95 rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl">
          <div className="p-4 sm:p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Change Password
            </h2>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPasswordFields.current ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 pr-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-sm"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswordFields({
                      ...showPasswordFields,
                      current: !showPasswordFields.current,
                    })
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPasswordFields.current ? (
                    <EyeOff className="h-4 w-4 text-slate-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswordFields.new ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 pr-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-sm"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswordFields({
                      ...showPasswordFields,
                      new: !showPasswordFields.new,
                    })
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPasswordFields.new ? (
                    <EyeOff className="h-4 w-4 text-slate-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswordFields.confirm ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 pr-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-sm"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswordFields({
                      ...showPasswordFields,
                      confirm: !showPasswordFields.confirm,
                    })
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPasswordFields.confirm ? (
                    <EyeOff className="h-4 w-4 text-slate-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => toast.success("Coming soon!")}
                disabled={
                  loading ||
                  !passwordForm.currentPassword ||
                  !passwordForm.newPassword ||
                  !passwordForm.confirmPassword
                }
                className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save Changes
              </button>
              <button
                onClick={() =>
                  setPasswordForm({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  })
                }
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
              >
                Reset
              </button>
              <button
                onClick={() =>
                  setShowPasswordFields({
                    current: false,
                    new: false,
                    confirm: false,
                  })
                }
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        show={showDeleteAccount}
        onClose={() => setShowDeleteAccount(false)}
      >
        <div className="backdrop-blur-xl bg-slate-900/95 rounded-xl sm:rounded-2xl border border-red-500/30 shadow-2xl">
          <div className="p-4 sm:p-6 border-b border-red-500/30 bg-gradient-to-r from-red-500/10 to-transparent">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Delete Account
            </h2>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            <p className="text-sm text-red-400">
              Are you sure you want to permanently delete your account? This
              action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => toast.success("Coming soon!")}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Delete Account
              </button>
              <button
                onClick={() => setShowDeleteAccount(false)}
                className="flex-1 px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 text-slate-300 rounded-lg font-medium hover:bg-white/20 hover:text-white transition-all duration-300 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        show={showNotificationSettings}
        onClose={() => setShowNotificationSettings(false)}
      >
        <div className="backdrop-blur-xl bg-slate-900/95 rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl">
          <div className="p-4 sm:p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Notification Settings
            </h2>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">
                  Email Notifications
                </span>
                <input
                  type="checkbox"
                  checked={false}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      email: e.target.checked,
                    })
                  }
                  className="toggle toggle-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">
                  Push Notifications
                </span>
                <input
                  type="checkbox"
                  checked={false}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      push: e.target.checked,
                    })
                  }
                  className="toggle toggle-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">
                  SMS Notifications
                </span>
                <input
                  type="checkbox"
                  checked={false}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      sms: e.target.checked,
                    })
                  }
                  className="toggle toggle-primary"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => toast.success("Coming soon!")}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save Changes
              </button>
              <button
                onClick={() => setShowNotificationSettings(false)}
                className="flex-1 px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 text-slate-300 rounded-lg font-medium hover:bg-white/20 hover:text-white transition-all duration-300 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="h-20"></div>
    </div>
  );
}
