'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './globals.css';
import {
  Shield,
  Activity,
  Database,
  Users,
  Scale,
  Sliders,
  Bell,
  Terminal,
  ExternalLink,
} from 'lucide-react';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'SOC Command Center', href: '/', icon: <Activity className="w-5 h-5" /> },
    { label: 'Threat Intelligence', href: '/threats', icon: <Database className="w-5 h-5" /> },
    { label: 'RBAC User Management', href: '/users', icon: <Users className="w-5 h-5" /> },
    { label: 'Forensics & Audit', href: '/audit', icon: <Scale className="w-5 h-5" /> },
    { label: 'Zero-Trust Policies', href: '/policy', icon: <Sliders className="w-5 h-5" /> },
  ];

  return (
    <html lang="en" className="dark">
      <head>
        <title>FIREWALL — Enterprise SOC Command Center</title>
      </head>
      <body className="bg-cyber-dark text-white flex min-h-screen">
        {/* Admin Navigation Sidebar */}
        <aside className="w-72 bg-[#0A1330] border-r border-cyber-blue/30 p-6 flex flex-col justify-between shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyber-blue to-cyber-cyan flex items-center justify-center shadow-neon-blue">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-black">
                  <span className="text-white">Fire</span>
                  <span className="text-cyber-orange">wall</span>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-cyber-cyan font-bold block">
                  SOC Master Control
                </span>
              </div>
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-cyber-blue text-white shadow-neon-blue'
                        : 'text-slate-400 hover:text-white hover:bg-[#101D42]'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <div className="text-xs font-semibold text-slate-400">
              SOC Operator: <span className="text-white font-bold">SecOps Admin</span>
            </div>
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between text-xs text-cyber-cyan hover:underline"
            >
              <span>Customer Console</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </aside>

        {/* Content Body */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-20 border-b border-cyber-blue/20 bg-[#050B1F]/90 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-emerald-300">
                SOC Active Defense Grid: 100% Mesh Health
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span>MITRE ATT&CK: v14.1</span>
              <span>•</span>
              <span>Cluster: US-WEST-HA</span>
            </div>
          </header>

          <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
