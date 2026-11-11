import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Shield,
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
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export default function HomePage() {
  const modules = [
    {
      id: 'identity_guardian',
      name: 'Identity Guardian',
      desc: 'Biometric MFA, breach alerts, and digital identity defense.',
      icon: <Fingerprint className="w-6 h-6 text-cyber-blue" />,
      color: 'blue',
      status: 'SECURE',
    },
    {
      id: 'phishing_shield',
      name: 'Phishing Shield',
      desc: 'Real-time URL heuristic analysis and zero-hour email protection.',
      icon: <Mail className="w-6 h-6 text-purple-400" />,
      color: 'purple',
      status: 'ACTIVE',
    },
    {
      id: 'endpoint_guardian',
      name: 'Endpoint Guardian',
      desc: 'Hardware enclave keystore and mobile integrity verification.',
      icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
      color: 'green',
      status: 'SHIELDED',
    },
    {
      id: 'network_sentinel',
      name: 'Network Sentinel',
      desc: 'Continuous Wi-Fi vulnerability audit, ARP spoofing & MITM shield.',
      icon: <Wifi className="w-6 h-6 text-cyber-cyan" />,
      color: 'cyan',
      status: 'MONITORING',
    },
    {
      id: 'vault_guardian',
      name: 'Vault Guardian',
      desc: 'AES-256-GCM zero-knowledge encrypted credential and note vault.',
      icon: <Lock className="w-6 h-6 text-cyber-orange" />,
      color: 'orange',
      status: 'ENCRYPTED',
    },
    {
      id: 'ransomware_guardian',
      name: 'Ransomware Guardian',
      desc: 'Canary honeypot traps and active mass encryption disruption.',
      icon: <Skull className="w-6 h-6 text-rose-500" />,
      color: 'red',
      status: 'ARMED',
    },
    {
      id: 'webshield',
      name: 'WebShield',
      desc: 'DNS-over-HTTPS encrypted filtering and ad telemetry sinkhole.',
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      color: 'blue',
      status: 'BLOCKING',
    },
    {
      id: 'digital_forensics',
      name: 'Digital Forensics',
      desc: 'Tamper-evident cryptographic ledger and incident timeline replay.',
      icon: <Scale className="w-6 h-6 text-cyan-300" />,
      color: 'cyan',
      status: 'IMMUTABLE',
    },
    {
      id: 'access_guardian',
      name: 'Access Guardian',
      desc: 'Context-aware Zero-Trust Network Access and adaptive geofencing.',
      icon: <Key className="w-6 h-6 text-emerald-300" />,
      color: 'green',
      status: 'ZTNA ACTIVE',
    },
    {
      id: 'threat_intelligence',
      name: 'Threat Intelligence',
      desc: 'STIX/TAXII ingestion of 1.2M+ global indicators and CVE feeds.',
      icon: <Database className="w-6 h-6 text-amber-400" />,
      color: 'orange',
      status: 'FEED SYNCED',
    },
    {
      id: 'cloud_backup_guardian',
      name: 'Cloud Backup Guardian',
      desc: 'Ransomware-proof immutable cloud snapshots and instant recovery.',
      icon: <Cloud className="w-6 h-6 text-sky-400" />,
      color: 'blue',
      status: 'SYNCED',
    },
    {
      id: 'cyber_soc',
      name: 'Cyber SOC',
      desc: '24/7 central SIEM security command and SOAR automated playbook.',
      icon: <Activity className="w-6 h-6 text-indigo-400" />,
      color: 'purple',
      status: '24/7 ONLINE',
    },
  ];

  return (
    <div className="flex flex-col items-center overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-28 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center cyber-grid">
        {/* Background Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-cyber-blue/20 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />

        {/* 12-in-1 Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyber-blue/15 border border-cyber-blue/40 text-cyber-cyan text-xs font-bold uppercase tracking-wider mb-8 shadow-neon-blue">
          <Shield className="w-4 h-4 text-cyber-blue" />
          <span>12-in-1 Enterprise Cybersecurity Ecosystem</span>
        </div>

        {/* Brand Master Title */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6 max-w-5xl">
          <span className="text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">Fire</span>
          <span className="bg-gradient-to-r from-[#FF6A00] via-[#FF8C00] to-[#FFAA00] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,106,0,0.6)]">
            wall
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-2xl sm:text-3xl font-medium text-slate-300 tracking-wide mb-4">
          — Your Digital World, Protected. —
        </p>

        {/* Subtitle */}
        <p className="max-w-2xl text-slate-400 text-base sm:text-lg mb-10 leading-relaxed">
          Autonomous defense powered by the SIS Cyber Fortress architecture. Unifying mobile protection, zero-knowledge encryption, zero-trust network access, and 24/7 SOC incident response.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyber-blue via-[#006CE6] to-[#0057C2] text-white font-extrabold text-base shadow-neon-blue hover:shadow-[0_0_40px_rgba(8,123,255,0.9)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 border border-blue-400/50"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0A1330] hover:bg-[#101D42] text-slate-200 font-bold text-base border border-cyber-blue/30 hover:border-cyber-cyan transition-all flex items-center justify-center gap-2"
          >
            <span>Launch Live Console</span>
            <ExternalLink className="w-4 h-4 text-cyber-cyan" />
          </Link>
        </div>

        {/* Key Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-4xl w-full mt-16 p-6 rounded-2xl bg-[#0A1330]/80 border border-cyber-blue/25 backdrop-blur-xl shadow-glass-card">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-black text-white">12 / 12</div>
            <div className="text-xs text-cyber-cyan font-semibold uppercase mt-1">Active Modules</div>
          </div>
          <div className="text-center border-l border-white/10">
            <div className="text-3xl sm:text-4xl font-black text-cyber-green">100%</div>
            <div className="text-xs text-slate-400 font-semibold uppercase mt-1">Zero-Day Defense</div>
          </div>
          <div className="text-center border-l border-white/10">
            <div className="text-3xl sm:text-4xl font-black text-white">99.9%</div>
            <div className="text-xs text-amber-400 font-semibold uppercase mt-1">SOC Uptime</div>
          </div>
          <div className="text-center border-l border-white/10">
            <div className="text-3xl sm:text-4xl font-black text-cyber-orange">1.2M+</div>
            <div className="text-xs text-slate-400 font-semibold uppercase mt-1">Threats Blocked</div>
          </div>
        </div>
      </section>

      {/* Visual Showcase Section */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative rounded-3xl p-3 sm:p-6 bg-gradient-to-b from-[#0A1C4D] via-[#0A1330] to-[#050B1F] border border-cyber-blue/40 shadow-neon-blue">
          <div className="text-center mb-6">
            <span className="text-xs uppercase font-bold tracking-widest text-cyber-cyan">Mobile & Web Architecture</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
              Unified Security Operations Console
            </h2>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-cyber-blue/30 shadow-2xl">
            <Image
              src="/images/showcase.png"
              alt="Firewall 12-in-1 Mobile App and Security Operations Showcase"
              width={1600}
              height={1000}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* 12-in-1 Security Modules Grid */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-blue/15 border border-cyber-blue/30 text-cyber-blue text-xs font-bold uppercase mb-3">
            <span>Enterprise Suite</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            12 Integrated Defense Pillars
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3">
            Every layer of your attack surface defended by autonomous, synchronized security engines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => (
            <div
              key={m.id}
              className="group relative rounded-2xl p-6 bg-[#0A1330]/90 border border-cyber-blue/20 hover:border-cyber-blue transition-all duration-300 hover:shadow-neon-blue hover:-translate-y-1 backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#101D42] border border-white/10 group-hover:border-cyber-blue/50 transition-colors">
                  {m.icon}
                </div>
                <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                  {m.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyber-cyan transition-colors">
                {m.name}
              </h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                {m.desc}
              </p>
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-cyber-blue group-hover:text-cyber-cyan">
                <span>Explore Module Specs</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Zero Trust Architecture Banner */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-[#0A1330] via-[#081842] to-[#0A1330] border border-cyber-blue/40 shadow-neon-blue flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-cyber-orange">SIS Cyber Fortress Baseline</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 leading-tight">
              Military-Grade Zero-Trust. Never Trust, Always Verify.
            </h2>
            <p className="text-slate-300 text-base mt-3 leading-relaxed">
              Every request authenticated, authorized, and cryptographically verified at runtime. From biometric keystores on Android to continuous SIEM telemetry in the cloud.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyber-green" />
                <span>ASVS 5.0 Level 3 Verification</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyber-green" />
                <span>NIST SP 800-218 SSDF Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyber-green" />
                <span>Zero-Knowledge AES-256 Vault</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyber-green" />
                <span>Hardware Biometric Keystore</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto">
            <Link
              href="/register"
              className="px-8 py-4 rounded-xl bg-cyber-blue text-white font-bold text-center shadow-neon-blue hover:scale-105 transition-transform"
            >
              Deploy Fortress Now
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 rounded-xl bg-[#101D42] text-slate-300 text-center border border-white/10 hover:border-cyber-cyan transition-colors"
            >
              Read Architecture Docs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
