'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  ShieldCheck,
  AlertTriangle,
  Smartphone,
  Clock,
  Fingerprint,
  Mail,
  Wifi,
  Lock,
  Skull,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export default function DashboardOverviewPage() {
  const [scanning, setScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState('');

  const triggerQuickScan = () => {
    setScanning(true);
    setScanMessage('Scanning network sockets and biometric integrity...');
    setTimeout(() => {
      setScanMessage('Verifying Android Keystore and cryptographic vaults...');
    }, 900);
    setTimeout(() => {
      setScanning(false);
      setScanMessage('All 12 Modules Verified Secure (Score: 98/100)');
    }, 1800);
  };

  const securityModules = [
    {
      id: 'identity_guardian',
      name: 'Identity Guardian',
      desc: 'Digital identity & account protection',
      icon: <Fingerprint className="w-6 h-6 text-cyber-blue" />,
      status: 'SECURE',
      color: 'blue',
      href: '/dashboard/modules',
    },
    {
      id: 'phishing_shield',
      name: 'Phishing Shield',
      desc: 'Detect and block phishing threats',
      icon: <Mail className="w-6 h-6 text-purple-400" />,
      status: 'PROTECTED',
      color: 'purple',
      href: '/dashboard/modules',
    },
    {
      id: 'endpoint_guardian',
      name: 'Endpoint Guardian',
      desc: 'Keystore & mobile integrity defense',
      icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
      status: 'TRUSTED',
      color: 'green',
      href: '/dashboard/modules',
    },
    {
      id: 'network_sentinel',
      name: 'Network Sentinel',
      desc: 'Checking for open Wi-Fi risks & ARP',
      icon: <Wifi className="w-6 h-6 text-cyber-cyan" />,
      status: 'MONITORING',
      color: 'cyan',
      href: '/dashboard/modules',
    },
    {
      id: 'vault_guardian',
      name: 'Vault Guardian',
      desc: 'AES-256-GCM zero-knowledge vault',
      icon: <Lock className="w-6 h-6 text-cyber-orange" />,
      status: 'LOCKED',
      color: 'orange',
      href: '/dashboard/vault',
    },
    {
      id: 'ransomware_guardian',
      name: 'Ransomware Guardian',
      desc: 'File canary & behavioral entropy',
      icon: <Skull className="w-6 h-6 text-rose-500" />,
      status: 'ARMED',
      color: 'red',
      href: '/dashboard/modules',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome & Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white">Welcome Back! Yeasin Arafat</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-cyber-blue/20 border border-cyber-cyan/40 text-cyber-cyan text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>Super User</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise Tenant ID: <span className="font-mono text-slate-300">FW-ENT-9021</span> • Last session check: Just now
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={triggerQuickScan}
            disabled={scanning}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-blue to-[#0057C2] text-white text-xs font-bold shadow-neon-blue hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-blue-400/40 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${scanning ? 'animate-spin' : ''}`} />
            <span>{scanning ? 'Scanning...' : 'Trigger Rapid Audit'}</span>
          </button>
        </div>
      </div>

      {scanMessage && (
        <div className="p-3 rounded-xl bg-cyber-blue/15 border border-cyber-blue text-cyber-cyan text-xs font-semibold flex items-center gap-2 animate-pulse">
          <Shield className="w-4 h-4 shrink-0" />
          <span>{scanMessage}</span>
        </div>
      )}

      {/* Big System Status Banner (From Mobile UI Screenshot) */}
      <Link
        href="/dashboard/security"
        className="block p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-emerald-900/60 to-emerald-950/80 border border-emerald-500/50 hover:border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/40">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">System Status</div>
              <div className="text-2xl font-black text-white">All Systems Secure</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm group-hover:translate-x-1 transition-transform">
            <span>View Diagnostics</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>

      {/* 4 Core Metric Cards (Exact match to Mobile Screenshot) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: 12 Modules */}
        <div className="p-5 rounded-2xl bg-[#0A1330] border border-cyber-blue/30 shadow-glass-card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-cyber-blue/20 text-cyber-blue">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-cyber-cyan uppercase">100% Active</span>
          </div>
          <div className="text-3xl font-black text-white">12</div>
          <div className="text-xs text-slate-400 font-semibold mt-0.5">Active Modules</div>
        </div>

        {/* Metric 2: 3 Alerts */}
        <Link href="/dashboard/alerts" className="p-5 rounded-2xl bg-[#0A1330] border border-rose-500/30 hover:border-rose-400 shadow-glass-card transition-colors block">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-rose-400 uppercase">Attention</span>
          </div>
          <div className="text-3xl font-black text-white">3</div>
          <div className="text-xs text-slate-400 font-semibold mt-0.5">Security Alerts</div>
        </Link>

        {/* Metric 3: 5 Devices */}
        <Link href="/dashboard/devices" className="p-5 rounded-2xl bg-[#0A1330] border border-cyber-cyan/30 hover:border-cyber-cyan shadow-glass-card transition-colors block">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-cyber-cyan/20 text-cyber-cyan">
              <Smartphone className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-cyber-cyan uppercase">Enrolled</span>
          </div>
          <div className="text-3xl font-black text-white">5</div>
          <div className="text-xs text-slate-400 font-semibold mt-0.5">Registered Devices</div>
        </Link>

        {/* Metric 4: 99.9% Uptime */}
        <div className="p-5 rounded-2xl bg-[#0A1330] border border-amber-500/30 shadow-glass-card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-amber-400 uppercase">SOC SLA</span>
          </div>
          <div className="text-3xl font-black text-white">99.9%</div>
          <div className="text-xs text-slate-400 font-semibold mt-0.5">Defense Uptime</div>
        </div>
      </div>

      {/* Security Modules Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-white">Security Modules</h2>
          <Link href="/dashboard/modules" className="text-xs font-bold text-cyber-cyan hover:underline flex items-center gap-1">
            <span>View All 12 Modules</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {securityModules.map((m) => (
            <Link
              key={m.id}
              href={m.href}
              className="p-5 rounded-2xl bg-[#0A1330] border border-cyber-blue/20 hover:border-cyber-blue transition-all group block shadow-glass-card"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-[#101D42] border border-white/10 group-hover:border-cyber-blue transition-colors">
                  {m.icon}
                </div>
                <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300">
                  {m.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyber-cyan transition-colors">
                {m.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1">{m.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Alerts Feed (Exact match to Mobile UI Screenshot) */}
      <div className="p-6 rounded-3xl bg-[#0A1330] border border-cyber-blue/30 shadow-glass-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-cyber-orange" />
            <h3 className="text-lg font-black text-white">Recent Security Alerts</h3>
          </div>
          <Link href="/dashboard/alerts" className="text-xs font-bold text-cyber-cyan hover:underline">
            Manage All Alerts (3)
          </Link>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 flex items-start gap-4">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1.5 shrink-0 animate-ping" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">Suspicious Login Attempt</span>
                <span className="text-[11px] text-slate-400">2 min ago</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">Unknown device from London, UK blocked by Access Guardian.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-4">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">Open Wi-Fi Network</span>
                <span className="text-[11px] text-slate-400">15 min ago</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">Public unencrypted Wi-Fi detected. Tunneling through WebShield DoH.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-950/40 border border-cyber-blue/40 flex items-start gap-4">
            <div className="w-2.5 h-2.5 rounded-full bg-cyber-blue mt-1.5 shrink-0" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">Backup Completed</span>
                <span className="text-[11px] text-slate-400">1 hour ago</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">Your data is safely backed up to immutable cloud vault.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
