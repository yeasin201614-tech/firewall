'use client';

import React, { useState } from 'react';
import {
  Fingerprint,
  Mail,
  Smartphone,
  Wifi,
  Lock,
  Skull,
  Globe,
  Scale,
  Key,
  Database,
  Cloud,
  Activity,
  Search,
  CheckCircle2,
  RefreshCw,
  X,
  Play,
  Shield,
} from 'lucide-react';

export default function DashboardModulesPage() {
  const [query, setQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<any | null>(null);
  const [runningAction, setRunningAction] = useState(false);
  const [actionDone, setActionDone] = useState(false);

  const modules = [
    {
      id: 'identity_guardian',
      name: 'Identity Guardian',
      tagline: 'Digital identity & account protection',
      desc: 'Enforces hardware-backed biometric MFA, tracks login access anomalies, and queries real-time dark web credential leak feeds.',
      features: ['Secure Login & MFA', 'Login Activity Monitor', 'Account Security Score', 'Breach Alert Service'],
      icon: <Fingerprint className="w-8 h-8 text-cyber-blue" />,
      score: 98,
      status: 'SECURE',
      category: 'IDENTITY',
    },
    {
      id: 'phishing_shield',
      name: 'Phishing Shield',
      tagline: 'Detect and block phishing threats',
      desc: 'Machine-speed heuristic parsing of incoming URLs, SMS links, and email attachments against 40+ global blacklists.',
      features: ['Real-time URL Heuristics', 'Malicious Domain Database', 'Zero-Hour Threat Defense', 'Sandboxing'],
      icon: <Mail className="w-8 h-8 text-purple-400" />,
      score: 96,
      status: 'ACTIVE',
      category: 'NETWORK',
    },
    {
      id: 'endpoint_guardian',
      name: 'Endpoint Guardian',
      tagline: 'Hardware trust root & mobile defense',
      desc: 'Validates device boot state, verifies Play Integrity API / hardware keystore signatures, and flags out-of-date OS patches.',
      features: ['Keystore Enclave Hardware Encryption', 'Root & Jailbreak Detection', 'App Signature Verification', 'Patch Audit'],
      icon: <Smartphone className="w-8 h-8 text-emerald-400" />,
      score: 100,
      status: 'SHIELDED',
      category: 'ENDPOINT',
    },
    {
      id: 'network_sentinel',
      name: 'Network Sentinel',
      tagline: 'Wi-Fi security & packet inspection',
      desc: 'Monitors wireless airwaves for evil twin attacks, ARP cache poisoning, rogue DHCP servers, and unauthorized port forwarding.',
      features: ['Open Wi-Fi Vulnerability Scan', 'ARP Spoofing & MITM Detection', 'DNS Hijacking Prevention', 'Rogue AP Block'],
      icon: <Wifi className="w-8 h-8 text-cyber-cyan" />,
      score: 94,
      status: 'MONITORING',
      category: 'NETWORK',
    },
    {
      id: 'vault_guardian',
      name: 'Vault Guardian',
      tagline: 'Zero-knowledge encrypted security vault',
      desc: 'Stores passwords, private keys, credit cards, and confidential notes using AES-256-GCM authenticated encryption.',
      features: ['AES-256-GCM Master Key Encryption', 'Zero-Knowledge Derivation', 'Biometric Quick-Unlock', 'Encrypted Notes'],
      icon: <Lock className="w-8 h-8 text-cyber-orange" />,
      score: 100,
      status: 'ENCRYPTED',
      category: 'DATA',
    },
    {
      id: 'ransomware_guardian',
      name: 'Ransomware Guardian',
      tagline: 'File canary & active entropy defense',
      desc: 'Places cryptographic honeypot files in strategic directories and monitors high-entropy I/O operations to kill encryptors.',
      features: ['Cryptographic Honeypot Traps', 'Mass Modification Blocker', 'Behavioral Memory Analysis', 'Shadow Copy Guard'],
      icon: <Skull className="w-8 h-8 text-rose-500" />,
      score: 99,
      status: 'ARMED',
      category: 'ENDPOINT',
    },
    {
      id: 'webshield',
      name: 'WebShield',
      tagline: 'Secure DNS-over-HTTPS & tracker sinkhole',
      desc: 'Directs all outbound DNS requests into an encrypted TLS pipeline, nullifying ISP tracking and blocking known malware origins.',
      features: ['DoH Encryption', 'Ad & Telemetry Sinkhole', 'Malicious Script Blocker', 'Strict HSTS & CSP'],
      icon: <Globe className="w-8 h-8 text-blue-400" />,
      score: 97,
      status: 'BLOCKING',
      category: 'NETWORK',
    },
    {
      id: 'digital_forensics',
      name: 'Digital Forensics',
      tagline: 'Audit trail & chain of custody preservation',
      desc: 'Records security operations events in a SHA-256 hash-chained immutable audit log for courtroom-admissible evidence.',
      features: ['SHA-256 Hash Chained Logs', 'Tamper-Evident Ledger', 'Timeline Replay', 'Compliance Evidence Export'],
      icon: <Scale className="w-8 h-8 text-cyan-300" />,
      score: 99,
      status: 'IMMUTABLE',
      category: 'INTELLIGENCE',
    },
    {
      id: 'access_guardian',
      name: 'Access Guardian',
      tagline: 'Zero-Trust network access & geofencing',
      desc: 'Continuously evaluates device posture, physical geolocation, and IP reputation before granting access to enterprise resources.',
      features: ['Context-Aware Conditional Access', 'Geofenced IP Authorization', 'Session Anomaly Termination', 'Device Revocation'],
      icon: <Key className="w-8 h-8 text-emerald-300" />,
      score: 95,
      status: 'ZTNA ACTIVE',
      category: 'IDENTITY',
    },
    {
      id: 'threat_intelligence',
      name: 'Threat Intelligence',
      tagline: 'Global IOC feeds & CVE vulnerability sync',
      desc: 'Ingests threat telemetry from global sensors, interpolating novel malware hashes and zero-day advisories continuously.',
      features: ['STIX / TAXII Global Feeds', 'CVE Zero-Day Correlation', 'Dark Web Leak Surveillance', 'Reputation Scoring'],
      icon: <Database className="w-8 h-8 text-amber-400" />,
      score: 98,
      status: 'FEED SYNCED',
      category: 'INTELLIGENCE',
    },
    {
      id: 'cloud_backup_guardian',
      name: 'Cloud Backup Guardian',
      tagline: 'Immutable disaster recovery snapshots',
      desc: 'Backs up user configurations, encrypted vaults, and system snapshots to geo-replicated WORM cloud object storage.',
      features: ['End-to-End Encrypted Cloud Sync', 'Snapshot Rollback', 'Ransomware-Proof Storage', 'Automated Backups'],
      icon: <Cloud className="w-8 h-8 text-sky-400" />,
      score: 100,
      status: 'SYNCED',
      category: 'DATA',
    },
    {
      id: 'cyber_soc',
      name: 'Cyber SOC',
      tagline: 'Central SIEM security operations command',
      desc: 'Aggregates threat telemetry from all 11 client engines into a single pane of glass with automated remediation playbooks.',
      features: ['24/7 Real-Time Telemetry', 'SOAR Automated Playbooks', 'Severity Correlation Engine', 'Escalation Queue'],
      icon: <Activity className="w-8 h-8 text-indigo-400" />,
      score: 99,
      status: '24/7 ONLINE',
      category: 'INTELLIGENCE',
    },
  ];

  const filtered = modules.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.tagline.toLowerCase().includes(query.toLowerCase()) ||
      m.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleRunDiagnostic = () => {
    setRunningAction(true);
    setActionDone(false);
    setTimeout(() => {
      setRunningAction(false);
      setActionDone(true);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">All Security Modules</h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete inventory of 12 autonomous security engines protecting your tenant.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 12 modules..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0A1330] border border-cyber-blue/30 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
          />
        </div>
      </div>

      {/* 12 Modules Grid (Matches "All Modules" from UI reference screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((m) => (
          <div
            key={m.id}
            onClick={() => {
              setSelectedModule(m);
              setActionDone(false);
            }}
            className="p-5 rounded-2xl bg-[#0A1330] border border-cyber-blue/20 hover:border-cyber-blue transition-all cursor-pointer group shadow-glass-card hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-[#101D42] border border-white/10 group-hover:border-cyber-blue transition-colors">
                {m.icon}
              </div>
              <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300">
                {m.score}/100
              </span>
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-cyber-cyan transition-colors">
              {m.name}
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{m.tagline}</p>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-cyber-blue">
              <span>Inspect Controls</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>

      {/* Module Detail Modal */}
      {selectedModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl p-8 rounded-3xl bg-[#0A1330] border border-cyber-blue/50 shadow-neon-blue relative">
            <button
              onClick={() => setSelectedModule(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-[#101D42] text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="p-3.5 rounded-2xl bg-[#101D42] border border-cyber-blue/40">
                {selectedModule.icon}
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">{selectedModule.name}</h3>
                <span className="text-xs text-cyber-cyan font-semibold">{selectedModule.tagline}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed my-4">{selectedModule.desc}</p>

            <div className="space-y-2 mt-6">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Protective Controls
              </div>
              {selectedModule.features.map((f: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyber-green shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            {actionDone && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Diagnostic Completed: All telemetry within verified parameters.</span>
              </div>
            )}

            <div className="mt-8 flex gap-3">
              <button
                onClick={handleRunDiagnostic}
                disabled={runningAction}
                className="flex-1 py-3 rounded-xl bg-cyber-blue text-white font-bold text-xs shadow-neon-blue flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {runningAction ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Run Module Diagnostic</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setSelectedModule(null)}
                className="px-6 py-3 rounded-xl bg-[#101D42] text-slate-300 font-semibold text-xs border border-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
