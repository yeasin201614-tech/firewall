'use client';

import React, { useState } from 'react';
import {
  Wifi,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Lock,
  Radio,
  Server,
  Terminal,
} from 'lucide-react';

export default function MySecurityPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(68);
  const [scanDone, setScanDone] = useState(false);

  const startNetworkScan = () => {
    setIsScanning(true);
    setScanDone(false);
    setProgress(15);

    setTimeout(() => setProgress(45), 400);
    setTimeout(() => setProgress(68), 900);
    setTimeout(() => setProgress(90), 1400);
    setTimeout(() => {
      setProgress(100);
      setIsScanning(false);
      setScanDone(true);
    }, 1900);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">My Security Diagnostics</h1>
        <p className="text-xs text-slate-400 mt-1">
          Deep posture assessment, wireless interface analysis, and live hardware enclave validation.
        </p>
      </div>

      {/* Network Sentinel Scanning Card (Exact Match to Mobile Screenshot) */}
      <div className="p-8 rounded-3xl bg-gradient-to-b from-[#101D42] via-[#0A1330] to-[#0A1330] border border-cyber-blue/40 shadow-neon-blue">
        <div className="flex flex-col items-center text-center max-w-xl mx-auto">
          {/* Glowing Animated Radar / Wi-Fi Rings */}
          <div className="relative w-28 h-28 flex items-center justify-center mb-6">
            <div className="absolute inset-0 rounded-full border border-cyber-cyan/30 animate-ping" />
            <div className="absolute inset-2 rounded-full border border-cyber-blue/50 animate-pulse" />
            <div className="w-20 h-20 rounded-full bg-cyber-blue/20 border-2 border-cyber-cyan flex items-center justify-center text-cyber-cyan shadow-neon-cyan">
              <Wifi className="w-10 h-10" />
            </div>
          </div>

          <h2 className="text-2xl font-black text-white">Network Sentinel</h2>
          <p className="text-sm text-slate-300 mt-1">
            {isScanning
              ? 'Checking for open Wi-Fi, security risks and vulnerabilities...'
              : scanDone
              ? 'Network audit completed. All parameters within secure parameters.'
              : 'Continuous Wi-Fi integrity inspection & MITM mitigation.'}
          </p>

          {/* Progress Bar (68% like screenshot) */}
          <div className="w-full mt-6">
            <div className="flex justify-between text-xs font-bold text-cyber-cyan mb-2">
              <span>{isScanning ? 'Scanning Network...' : 'Audit State'}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-3 bg-[#050B1F] rounded-full overflow-hidden border border-white/10 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-cyber-blue to-cyber-cyan rounded-full transition-all duration-300 shadow-neon-blue"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Scan Details Checklist */}
          <div className="w-full mt-8 p-5 rounded-2xl bg-[#050B1F]/70 border border-white/10 text-left space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Scan Details
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyber-green shrink-0" />
                <span>Network Information & ESSID Fingerprint</span>
              </span>
              <span className="text-emerald-400 font-mono">WPA3-ENT</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyber-green shrink-0" />
                <span>Security Check & ARP Spoofing Validation</span>
              </span>
              <span className="text-emerald-400 font-mono">PASSED</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-slate-200">
                {progress >= 90 ? (
                  <CheckCircle2 className="w-4 h-4 text-cyber-green shrink-0" />
                ) : (
                  <RefreshCw className="w-4 h-4 text-cyber-blue shrink-0 animate-spin" />
                )}
                <span>Risk Analysis & Open Port Surface Scan...</span>
              </span>
              <span className={progress >= 90 ? 'text-emerald-400 font-mono' : 'text-cyber-cyan font-mono'}>
                {progress >= 90 ? 'SECURE' : 'IN PROGRESS'}
              </span>
            </div>
          </div>

          <button
            onClick={startNetworkScan}
            disabled={isScanning}
            className="mt-6 px-8 py-3.5 rounded-xl bg-cyber-blue text-white font-bold text-sm shadow-neon-blue hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning Network...' : 'Run Network Sentinel Audit'}</span>
          </button>
        </div>
      </div>

      {/* Posture Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#0A1330] border border-cyber-blue/30 shadow-glass-card">
          <div className="flex items-center gap-3 mb-3">
            <Lock className="w-5 h-5 text-cyber-cyan" />
            <h3 className="font-bold text-white text-base">Android Keystore</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Hardware backed cryptographic keymaster verified. Private keys reside in TrustZone chip.
          </p>
          <div className="mt-4 text-xs font-bold text-cyber-green flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Hardware Enclave Active</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0A1330] border border-cyber-blue/30 shadow-glass-card">
          <div className="flex items-center gap-3 mb-3">
            <Server className="w-5 h-5 text-cyber-blue" />
            <h3 className="font-bold text-white text-base">Kernel Integrity</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            SELinux enforcing. Zero root hooks, Magisk binaries, or unauthorized zygote injections detected.
          </p>
          <div className="mt-4 text-xs font-bold text-cyber-green flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>System Untampered</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0A1330] border border-cyber-blue/30 shadow-glass-card">
          <div className="flex items-center gap-3 mb-3">
            <Radio className="w-5 h-5 text-cyber-orange" />
            <h3 className="font-bold text-white text-base">WebShield DoH</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Encrypted DNS resolver connected to Cloudflare Security 1.1.1.2. Zero DNS queries visible to ISP.
          </p>
          <div className="mt-4 text-xs font-bold text-cyber-green flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>DNS Tunnel Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
