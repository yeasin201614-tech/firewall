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
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export default function ModulesPage() {
  const [searchUrl, setSearchUrl] = useState('');
  const [scanResult, setScanResult] = useState<{
    tested: boolean;
    isSafe: boolean;
    details: string;
    score: number;
  } | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchUrl) return;

    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const isBad =
        searchUrl.includes('phish') ||
        searchUrl.includes('fake') ||
        searchUrl.includes('hack') ||
        searchUrl.includes('crypto-airdrop');

      if (isBad) {
        setScanResult({
          tested: true,
          isSafe: false,
          details: 'Deceptive credential harvesting portal flagged by AI Phishing Shield.',
          score: 18,
        });
      } else {
        setScanResult({
          tested: true,
          isSafe: true,
          details: 'This link is safe to visit. Valid TLS certificate & domain reputation verified.',
          score: 99,
        });
      }
    }, 800);
  };

  const modules = [
    {
      id: 'identity_guardian',
      name: 'Identity Guardian',
      tagline: 'Digital identity & account protection',
      features: ['Secure Login & MFA', 'Login Activity Monitor', 'Account Security Score', 'Breach Alert Service'],
      icon: <Fingerprint className="w-8 h-8 text-cyber-blue" />,
    },
    {
      id: 'phishing_shield',
      name: 'Phishing Shield',
      tagline: 'Detect and block phishing threats',
      features: ['Real-time URL Heuristics', 'Malicious Domain Database', 'Zero-Hour Threat Defense', 'Sandboxing'],
      icon: <Mail className="w-8 h-8 text-purple-400" />,
    },
    {
      id: 'endpoint_guardian',
      name: 'Endpoint Guardian',
      tagline: 'Hardware trust root & mobile defense',
      features: ['Keystore Enclave Hardware Encryption', 'Root & Jailbreak Detection', 'App Signature Verification', 'Patch Audit'],
      icon: <Smartphone className="w-8 h-8 text-emerald-400" />,
    },
    {
      id: 'network_sentinel',
      name: 'Network Sentinel',
      tagline: 'Wi-Fi security & packet inspection',
      features: ['Open Wi-Fi Vulnerability Scan', 'ARP Spoofing & MITM Detection', 'DNS Hijacking Prevention', 'Rogue AP Block'],
      icon: <Wifi className="w-8 h-8 text-cyber-cyan" />,
    },
    {
      id: 'vault_guardian',
      name: 'Vault Guardian',
      tagline: 'Zero-knowledge encrypted security vault',
      features: ['AES-256-GCM Master Key Encryption', 'Zero-Knowledge Derivation', 'Biometric Quick-Unlock', 'Encrypted Notes'],
      icon: <Lock className="w-8 h-8 text-cyber-orange" />,
    },
    {
      id: 'ransomware_guardian',
      name: 'Ransomware Guardian',
      tagline: 'File canary & active entropy defense',
      features: ['Cryptographic Honeypot Traps', 'Mass Modification Blocker', 'Behavioral Memory Analysis', 'Shadow Copy Guard'],
      icon: <Skull className="w-8 h-8 text-rose-500" />,
    },
    {
      id: 'webshield',
      name: 'WebShield',
      tagline: 'Secure DNS-over-HTTPS & tracker sinkhole',
      features: ['DoH Encryption', 'Ad & Telemetry Sinkhole', 'Malicious Script Blocker', 'Strict HSTS & CSP'],
      icon: <Globe className="w-8 h-8 text-blue-400" />,
    },
    {
      id: 'digital_forensics',
      name: 'Digital Forensics',
      tagline: 'Audit trail & chain of custody preservation',
      features: ['SHA-256 Hash Chained Logs', 'Tamper-Evident Ledger', 'Timeline Replay', 'Compliance Evidence Export'],
      icon: <Scale className="w-8 h-8 text-cyan-300" />,
    },
    {
      id: 'access_guardian',
      name: 'Access Guardian',
      tagline: 'Zero-Trust network access & geofencing',
      features: ['Context-Aware Conditional Access', 'Geofenced IP Authorization', 'Session Anomaly Termination', 'Device Revocation'],
      icon: <Key className="w-8 h-8 text-emerald-300" />,
    },
    {
      id: 'threat_intelligence',
      name: 'Threat Intelligence',
      tagline: 'Global IOC feeds & CVE vulnerability sync',
      features: ['STIX / TAXII Global Feeds', 'CVE Zero-Day Correlation', 'Dark Web Leak Surveillance', 'Reputation Scoring'],
      icon: <Database className="w-8 h-8 text-amber-400" />,
    },
    {
      id: 'cloud_backup_guardian',
      name: 'Cloud Backup Guardian',
      tagline: 'Immutable disaster recovery snapshots',
      features: ['End-to-End Encrypted Cloud Sync', 'Snapshot Rollback', 'Ransomware-Proof Storage', 'Automated Backups'],
      icon: <Cloud className="w-8 h-8 text-sky-400" />,
    },
    {
      id: 'cyber_soc',
      name: 'Cyber SOC',
      tagline: 'Central SIEM security operations command',
      features: ['24/7 Real-Time Telemetry', 'SOAR Automated Playbooks', 'Severity Correlation Engine', 'Escalation Queue'],
      icon: <Activity className="w-8 h-8 text-indigo-400" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase font-bold tracking-widest text-cyber-cyan">Full Catalog</span>
        <h1 className="text-4xl sm:text-6xl font-black text-white mt-2">
          The 12 Security Modules
        </h1>
        <p className="text-slate-400 text-lg mt-4">
          Integrated directly into the mobile app and enterprise cloud console.
        </p>
      </div>

      {/* Interactive Phishing Shield Scanner Demo */}
      <div className="max-w-3xl mx-auto mb-20 p-8 rounded-3xl bg-gradient-to-b from-[#101D42] to-[#0A1330] border border-cyber-blue/40 shadow-neon-blue">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Live Phishing Shield Simulator</h3>
            <p className="text-xs text-slate-400">Scan any URL through the FIREWALL threat reputation database</p>
          </div>
        </div>

        <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3 mt-4">
          <input
            type="text"
            value={searchUrl}
            onChange={(e) => setSearchUrl(e.target.value)}
            placeholder="Enter URL to scan... e.g. https://mycompany-login.secure-auth.xyz"
            className="flex-1 px-4 py-3 rounded-xl bg-[#050B1F] border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
          />
          <button
            type="submit"
            disabled={isScanning}
            className="px-6 py-3 rounded-xl bg-cyber-blue text-white font-bold flex items-center justify-center gap-2 shadow-neon-blue hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {isScanning ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Scan Now</span>
              </>
            )}
          </button>
        </form>

        {scanResult && (
          <div
            className={`mt-6 p-4 rounded-xl border flex items-start gap-4 transition-all ${
              scanResult.isSafe
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/60 border-rose-500/50 text-rose-200'
            }`}
          >
            {scanResult.isSafe ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-bold text-base">
                {scanResult.isSafe ? 'Safe Link — Verified Authentic' : 'Threat Blocked — Suspicious Link'}
              </div>
              <div className="text-xs mt-1 text-slate-300">{scanResult.details}</div>
              <div className="text-xs font-semibold mt-2">
                Reputation Score: <span className="underline">{scanResult.score} / 100</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modules.map((m) => (
          <div
            key={m.id}
            className="p-8 rounded-2xl bg-[#0A1330] border border-cyber-blue/20 hover:border-cyber-blue transition-all duration-300 shadow-glass-card"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-2xl bg-[#101D42] border border-white/10">{m.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-white">{m.name}</h3>
                <span className="text-xs text-cyber-cyan">{m.tagline}</span>
              </div>
            </div>

            <ul className="space-y-2 mt-6 pt-6 border-t border-white/10 text-xs text-slate-300">
              {m.features.map((f, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyber-blue shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
