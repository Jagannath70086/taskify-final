"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, User, Home, Activity, LogOut } from "lucide-react";
import Modal from "./ui/modal";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export default function NavBar({ user }) {
  const pathname = usePathname();
  const [logoutConfirmation, setLogoutConfirmation] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
    {
      id: "activities",
      label: "Activities",
      icon: Activity,
      href: "/activities",
    },
    { id: "profile", label: "Profile", icon: User, href: "/profile" },
    // { id: "about", label: "About Us", icon: Info, href: "/about" },
    // { id: "contact", label: "Contact Us", icon: Mail, href: "/contact" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
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
                      <Icon
                        className={`h-4 w-4 mr-2 transition-all duration-300 ${
                          isActive(item.href)
                            ? "text-blue-300"
                            : "text-slate-400 group-hover:text-white"
                        }`}
                      />
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
              <div
                onClick={() => setLogoutConfirmation(true)}
                className="p-2 rounded-xl hover:bg-gradient-to-r hover:from-red-500/20 hover:to-rose-500/20 hover:border hover:border-red-400/30 transition-all duration-300 backdrop-blur-sm text-red-400 hover:text-red-300 group hover:shadow-lg hover:shadow-red-500/20 hover:scale-105"
              >
                <LogOut className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
            </div>
          </div>
        </div>
      </nav>

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
                <Icon
                  className={`h-6 w-6 mb-1 transition-all duration-300 ${
                    isActive(item.href)
                      ? "text-blue-300 scale-110"
                      : "text-slate-400 group-hover:text-white group-hover:scale-105"
                  }`}
                />
                <span
                  className={`text-xs font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? "text-blue-200"
                      : "text-slate-400 group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
      <Modal
        show={logoutConfirmation}
        onClose={() => setLogoutConfirmation(false)}
      >
        <div className="backdrop-blur-xl bg-slate-900/95 rounded-2xl border border-white/10 shadow-2xl max-w-sm w-full">
          <div className="relative p-6 border-b border-white/10 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">Logout</h2>
              </div>
              <button
                onClick={() => setLogoutConfirmation(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Are you sure you want to{" "}
                <span className="text-white font-semibold bg-white/10 px-2 py-1 rounded-lg">
                  Logout
                </span>
                ?
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={ async () => {
                  await signOut();
                  toast.success("Logged out successfully!", {
                    duration: 3000,
                    style: {
                      background: "rgba(0, 0, 0, 0.8)",
                      color: "#fff",
                    },
                  });
                  setLogoutConfirmation(false);
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-red-500/25 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg
  className="w-4 h-4"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
  />
</svg>

                Logout
              </button>
              <button
                onClick={() => {
                  setLogoutConfirmation(false);
                }}
                className="flex-1 px-6 py-3 backdrop-blur-xl bg-white/5 border border-white/10 text-slate-300 rounded-xl font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                Stay
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
