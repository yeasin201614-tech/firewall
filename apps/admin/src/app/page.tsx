'use client';

import React, { useState } from 'react';
import {
  Activity,
  ShieldAlert,
  Zap,
  TrendingUp,
  Cpu,
  Globe2,
  Lock,
  Radio,
  Clock,
  Terminal,
} from 'lucide-react';

export default function AdminSocPage() {
  const [telemetryLogs, setTelemetryLogs] = useState([
    { id: 1, time: '13:30:14', level: 'BLOCKED', desc: 'Tor exit node 185.220.101.5 blocked by Access Guardian geofence' },
    { id: 2, time: '13:28:40', level: 'CLEANSED', desc: 'Heuristic Phishing URL match on zero-day landing domain' },
    { id: 3, time: '13:24:02', level: 'AUDITED', desc: 'Hardware Titan M2 key verification for Yeasin Arafat Android 15 device' },
    { id: 4, time: '13:19:55', level: 'BLOCKED', desc: 'Cryptographic canary file modification intercepted; ransomware process terminated' },
  ]);

  const mitreTactics = [
    { tactic: 'Initial Access', count: 142, pct: 85, color: 'bg-rose-500' },
    { tactic: 'Execution', count: 28, pct: 40, color: 'bg-amber-500' },
    { tactic: 'Persistence', count: 16, pct: 25, color: 'bg-yellow-400' },
    { tactic: 'Privilege Escalation', count: 7, pct: 15, color: 'bg-purple-500' },
    { tactic: 'Defense Evasion', count: 89, pct: 70, color: 'bg-cyber-blue' },
    { tactic: 'Credential Access', count: 54, pct: 55, color: 'bg-cyber-cyan' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">Security Operations Center (SOC)</h1>
        <p className="text-xs text-slate-400 mt-1">
          High-throughput telemetry ingestion, automated SOAR playbooks, and threat correlation.
        </p>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0A1330] border border-rose-500/40 shadow-glass-card">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-semibold">
            <span>Threats Blocked (24h)</span>
            <ShieldAlert className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-black text-white">684</div>
          <div className="text-[11px] text-cyber-green mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14.2% automated interception rate</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0A1330] border border-cyber-blue/40 shadow-glass-card">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-semibold">
            <span>Events Processed</span>
            <Zap className="w-4 h-4 text-cyber-blue" />
          </div>
          <div className="text-3xl font-black text-white">1,845,200</div>
          <div className="text-[11px] text-cyber-cyan mt-1">Telemetry stream latency: 42ms</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0A1330] border border-cyber-cyan/40 shadow-glass-card">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-semibold">
            <span>Protected Mesh Nodes</span>
            <Cpu className="w-4 h-4 text-cyber-cyan" />
          </div>
          <div className="text-3xl font-black text-white">1,420</div>
          <div className="text-[11px] text-emerald-400 mt-1">All agents reporting healthy</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0A1330] border border-amber-500/40 shadow-glass-card">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-semibold">
            <span>Zero-Day IOC Blacklist</span>
            <Globe2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">1,219,840</div>
          <div className="text-[11px] text-amber-300 mt-1">Synced across STIX/TAXII v2.1</div>
        </div>
      </div>

      {/* MITRE ATT&CK Matrix & Live Telemetry Console */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MITRE ATT&CK Breakdown */}
        <div className="p-6 rounded-3xl bg-[#0A1330] border border-cyber-blue/30 shadow-glass-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-black text-white">MITRE ATT&CK® Observed Tactics</h2>
            <span className="text-xs text-cyber-cyan font-mono font-bold">24h Spectrum</span>
          </div>

          <div className="space-y-4">
            {mitreTactics.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{item.tactic}</span>
                  <span className="font-mono text-slate-400">{item.count} events</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#050B1F] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Security Log Stream */}
        <div className="p-6 rounded-3xl bg-[#0A1330] border border-cyber-blue/30 shadow-glass-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyber-green" />
                <h2 className="text-base font-black text-white">Real-Time Defense Telemetry</h2>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                LIVE STREAM
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              {telemetryLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-[#050B1F] border border-white/10 flex items-start gap-3"
                >
                  <span className="text-slate-500 shrink-0">{log.time}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                      log.level === 'BLOCKED'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        : log.level === 'CLEANSED'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-cyber-blue/20 text-cyber-cyan border border-cyber-blue/40'
                    }`}
                  >
                    {log.level}
                  </span>
                  <span className="text-slate-300 text-[11px] leading-tight">{log.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>SOAR Playbook Auto-Remediation: ENABLED</span>
            <span className="text-cyber-green font-bold">Latency: 42ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
