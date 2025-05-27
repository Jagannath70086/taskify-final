"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, User, Home, Activity, Info, Mail, LogOut } from "lucide-react";

export default function NavBar({ user }) {
  const pathname = usePathname();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
    {
      id: "activities",
      label: "Activities",
      icon: Activity,
      href: "/activities",
    },
    { id: "profile", label: "Profile", icon: User, href: "/profile" },
    { id: "about", label: "About Us", icon: Info, href: "/about" },
    { id: "contact", label: "Contact Us", icon: Mail, href: "/contact" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 border-b border-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 shadow-2xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <Link href="/dashboard">
                  <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 cursor-pointer hover:from-blue-300 hover:via-purple-300 hover:to-violet-300 transition-all duration-300">
                    Taskify
                  </h1>
                </Link>
              </div>

              <div className="flex space-x-2">
                {navItems.map((item) => {
                  if (item.id === "profile") return null;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm group ${
                        isActive(item.href)
                          ? "bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-violet-500/30 text-blue-200 border border-blue-400/40 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                          : "text-slate-300 hover:bg-gradient-to-r hover:from-white/10 hover:via-white/15 hover:to-white/10 hover:text-white hover:border hover:border-white/20 hover:shadow-lg hover:shadow-white/10"
                      }`}
                    >
                      <Icon className={`h-4 w-4 mr-2 transition-all duration-300 ${
                        isActive(item.href) 
                          ? "text-blue-300" 
                          : "text-slate-400 group-hover:text-white"
                      }`} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-xl hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-orange-500/20 hover:border hover:border-amber-400/30 transition-all duration-300 backdrop-blur-sm group hover:shadow-lg hover:shadow-amber-500/20">
                <Bell className="h-5 w-5 text-slate-300 group-hover:text-amber-300 transition-colors duration-300" />
              </button>
              <Link
                className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 backdrop-blur-sm border border-slate-500/30 hover:from-slate-600/60 hover:via-slate-500/60 hover:to-slate-600/60 hover:border-slate-400/40 transition-all duration-300 shadow-lg hover:shadow-slate-500/20 hover:scale-105"
                href="/profile"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 flex items-center justify-center shadow-lg">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm text-slate-200 font-medium">
                  {user.name || "User"}
                </span>
              </Link>
              <Link
                href="/api/auth/signout"
                className="p-2 rounded-xl hover:bg-gradient-to-r hover:from-red-500/20 hover:to-rose-500/20 hover:border hover:border-red-400/30 transition-all duration-300 backdrop-blur-sm text-red-400 hover:text-red-300 group hover:shadow-lg hover:shadow-red-500/20 hover:scale-105"
              >
                <LogOut className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Top Header */}
      <nav className="md:hidden relative sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 border-b border-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 shadow-2xl">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/dashboard">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 hover:from-blue-300 hover:via-purple-300 hover:to-violet-300 transition-all duration-300">
              Taskify
            </h1>
          </Link>

          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-xl hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-orange-500/20 hover:border hover:border-amber-400/30 transition-all duration-300 group">
              <Bell className="h-5 w-5 text-slate-300 group-hover:text-amber-300 transition-colors duration-300" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 border-t border-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 shadow-2xl">
        <div className="flex items-center justify-around px-4 py-3">
          {navItems.slice(0, 3).map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 min-w-0 flex-1 group ${
                  isActive(item.href)
                    ? "bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-violet-500/30 text-blue-200 border border-blue-400/40 shadow-lg shadow-blue-500/20"
                    : "text-slate-400 hover:text-white active:bg-gradient-to-br active:from-white/10 active:via-white/15 active:to-white/10 hover:shadow-lg"
                }`}
              >
                <Icon className={`h-6 w-6 mb-1 transition-all duration-300 ${
                  isActive(item.href) 
                    ? "text-blue-300 scale-110" 
                    : "text-slate-400 group-hover:text-white group-hover:scale-105"
                }`} />
                <span className={`text-xs font-medium transition-all duration-300 ${
                  isActive(item.href) 
                    ? "text-blue-200" 
                    : "text-slate-400 group-hover:text-white"
                }`}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}