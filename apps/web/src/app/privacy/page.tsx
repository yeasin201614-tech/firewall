import React from 'react';
import { ShieldCheck, EyeOff, Lock, Server } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <span className="text-xs uppercase font-bold tracking-widest text-cyber-green">Zero-Knowledge Guarantee</span>
        <h1 className="text-4xl font-black text-white mt-2">Privacy & Cryptographic Charter</h1>
        <p className="text-slate-400 text-sm mt-2">Last updated: November 2026 • Compliant with GDPR, CCPA & HIPAA</p>
      </div>

      <div className="p-8 rounded-3xl bg-[#0A1330] border border-cyber-blue/30 space-y-8 text-slate-300 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-cyber-cyan" />
            1. Zero-Knowledge Architecture
          </h2>
          <p>
            FIREWALL utilizes client-side envelope encryption. Passwords, vault records, biometric templates, and sensitive scan telemetry are encrypted locally with AES-256-GCM before transmission. Our servers never receive, store, or have mathematical means to reconstruct your decryption keys.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-cyber-orange" />
            2. No Telemetry Selling or Ad Profiling
          </h2>
          <p>
            We do not sell, rent, or monetize your IP addresses, domain lookups, device posture metrics, or browsing requests. WebShield operates an internal encrypted sinkhole and discards request metadata immediately after threat classification.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <Server className="w-5 h-5 text-cyber-blue" />
            3. Hardware Security Enclaves
          </h2>
          <p>
            On Android devices, cryptographic master keys are stored directly in the hardware Titan M2 or TrustZone enclave, governed by Android Keystore and BiometricPrompt Tier 3 safeguards.
          </p>
        </section>
      </div>
    </div>
  );
}
