'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  LayoutDashboard,
  ShieldCheck,
  Grid,
  Bell,
  Smartphone,
  Lock,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  User,
  Radio,
  Search,
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'My Security', href: '/dashboard/security', icon: <ShieldCheck className="w-5 h-5" /> },
    { label: 'Security Modules', href: '/dashboard/modules', icon: <Grid className="w-5 h-5" /> },
    { label: 'Secure Vault', href: '/dashboard/vault', icon: <Lock className="w-5 h-5" /> },
    { label: 'Security Alerts', href: '/dashboard/alerts', icon: <Bell className="w-5 h-5" />, badge: '3' },
    { label: 'My Devices', href: '/dashboard/devices', icon: <Smartphone className="w-5 h-5" />, badge: '5' },
  ];

  return (
    <div className="min-h-screen bg-[#050B1F] flex text-white">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-72 flex-col justify-between border-r border-cyber-blue/20 bg-[#0A1330]/90 backdrop-blur-xl p-6">
        <div>
          {/* Brand Emblem */}
          <Link href="/" className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyber-blue to-cyber-cyan flex items-center justify-center shadow-neon-blue">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-black leading-none">
                <span className="text-white">Fire</span>
                <span className="text-cyber-orange">wall</span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
                Enterprise Console
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-cyber-blue text-white shadow-neon-blue border border-blue-400/40'
                      : 'text-slate-300 hover:text-white hover:bg-[#101D42]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-rose-500 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4 p-2 rounded-xl bg-[#101D42]/60 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-cyber-blue/30 border border-cyber-cyan/50 flex items-center justify-center font-bold text-cyber-cyan">
              YA
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold truncate text-white">Yeasin Arafat</div>
              <div className="text-[10px] text-cyber-green font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-green" />
                <span>Super User</span>
              </div>
            </div>
          </div>
          <Link
            href="/login"
            className="flex items-center gap-2 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors px-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-20 border-b border-cyber-blue/20 bg-[#050B1F]/80 backdrop-blur-md px-6 sm:px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Secure (Score 98/100)</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/alerts"
              className="relative p-2.5 rounded-xl bg-[#101D42] border border-white/10 hover:border-cyber-blue text-slate-300 hover:text-white transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold flex items-center justify-center text-white">
                3
              </span>
            </Link>

            <div className="flex items-center gap-3 pl-2 border-l border-white/10">
              <div className="w-9 h-9 rounded-full bg-cyber-blue flex items-center justify-center font-bold text-xs text-white shadow-neon-blue">
                YA
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold text-white">Yeasin Arafat</div>
                <div className="text-[10px] text-cyber-cyan font-semibold">yeasin@example.com</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
