'use client';

import React, { useState } from 'react';
import {
  Sliders,
  Shield,
  Smartphone,
  Globe2,
  Lock,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export default function AdminPolicyPage() {
  const [policies, setPolicies] = useState([
    {
      id: 'pol-1',
      title: 'Enforce Hardware Keystore on Android',
      desc: 'Reject session tokens if the client device fails Titan M2 / TrustZone hardware enclave backing.',
      enabled: true,
      category: 'DEVICE',
    },
    {
      id: 'pol-2',
      title: 'Root & Jailbreak Zero-Tolerance Quarantine',
      desc: 'Instantly revoke access and scrub on-device cached vault keys upon detecting Magisk, Zygisk, or su binaries.',
      enabled: true,
      category: 'ENDPOINT',
    },
    {
      id: 'pol-3',
      title: 'Mandatory FIDO2 / Biometric MFA for Super Users',
      desc: 'Require biometric or hardware TOTP verification on every administrative or vault export action.',
      enabled: true,
      category: 'IDENTITY',
    },
    {
      id: 'pol-4',
      title: 'Tor Exit Node & Anonymizing VPN Auto-Block',
      desc: 'Automatically flag and block ingress authentication attempts routed through known Tor exit relays.',
      enabled: true,
      category: 'NETWORK',
    },
    {
      id: 'pol-5',
      title: 'Strict DoH (DNS-over-HTTPS) Enforcement',
      desc: 'Direct all mobile application DNS lookups through dedicated encrypted Cloudflare 1.1.1.2 security resolvers.',
      enabled: true,
      category: 'NETWORK',
    },
  ]);

  const togglePolicy = (id: string) => {
    setPolicies(policies.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">Zero-Trust Policy Engine</h1>
        <p className="text-xs text-slate-400 mt-1">
          Define global enforcement rules, posture conditions, and autonomous remediation actions.
        </p>
      </div>

      <div className="space-y-4">
        {policies.map((p) => (
          <div
            key={p.id}
            className="p-6 rounded-2xl bg-[#0A1330] border border-cyber-blue/30 flex items-center justify-between gap-6 shadow-glass-card"
          >
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold text-white">{p.title}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#101D42] text-cyber-cyan border border-white/10">
                  {p.category}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">{p.desc}</p>
            </div>

            <button
              onClick={() => togglePolicy(p.id)}
              className={`w-14 h-8 rounded-full transition-colors relative p-1 shrink-0 ${
                p.enabled ? 'bg-cyber-blue shadow-neon-blue' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white transition-transform ${
                  p.enabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
