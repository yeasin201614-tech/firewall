import React from 'react';
import Link from 'next/link';
import { Check, Shield } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Personal Shield',
      price: '$9',
      period: '/ month',
      description: 'Ideal for individuals seeking military-grade mobile and identity protection.',
      features: [
        'Android Native Mobile App with Biometric Keystore',
        'Identity Guardian & Dark Web Alerts',
        'Phishing Shield & Real-Time URL Heuristics',
        'Network Sentinel Wi-Fi Scanner',
        'Zero-Knowledge Encrypted Vault (Up to 100 items)',
        'Up to 3 Active Protected Devices',
      ],
      cta: 'Start 14-Day Free Trial',
      highlighted: false,
    },
    {
      name: 'Pro Fortress',
      price: '$29',
      period: '/ month',
      description: 'Complete 12-in-1 cyber defense for developers, founders, and security practitioners.',
      features: [
        'Everything in Personal Shield',
        'All 12 Autonomous Security Modules Included',
        'Ransomware Guardian File Honeypots',
        'WebShield Encrypted DNS-over-HTTPS',
        'Digital Forensics Tamper-Evident Ledger',
        'Unlimited Zero-Knowledge Encrypted Vault',
        'Immutable Cloud Backup (50 GB)',
        'Up to 10 Protected Devices (Android, Mac, Win, Linux)',
      ],
      cta: 'Get Pro Fortress',
      highlighted: true,
    },
    {
      name: 'Enterprise SOC',
      price: '$199',
      period: '/ month',
      description: 'Full SIEM/SOC operations, automated playbooks, and dedicated defense architecture.',
      features: [
        'Everything in Pro Fortress',
        'Dedicated 24/7 Cyber SOC Command Center',
        'Zero-Trust Network Access (ZTNA) Controller',
        'Custom STIX/TAXII Threat Feed Ingestion',
        'SOC 2 Type II & ASVS Compliance Exports',
        'Dedicated Incident Response SLA (<15 min)',
        'Unlimited Protected Devices & Multi-User RBAC',
      ],
      cta: 'Contact SOC Team',
      highlighted: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase font-bold tracking-widest text-cyber-cyan">Transparent Pricing</span>
        <h1 className="text-4xl sm:text-6xl font-black text-white mt-2">
          Enterprise Security for Every Scale
        </h1>
        <p className="text-slate-400 text-lg mt-4">
          Simple, honest pricing backed by our 100% Zero-Day Guarantee and 30-day money-back policy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((p, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
              p.highlighted
                ? 'bg-gradient-to-b from-[#101D42] to-[#0A1330] border-2 border-cyber-blue shadow-neon-blue relative scale-105'
                : 'bg-[#0A1330] border border-white/10 hover:border-cyber-blue/40'
            }`}
          >
            {p.highlighted && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyber-blue text-white text-[11px] font-black uppercase tracking-wider shadow-neon-blue">
                Most Popular
              </div>
            )}
            <div>
              <h3 className="text-2xl font-black text-white">{p.name}</h3>
              <p className="text-xs text-slate-400 mt-2 min-h-[36px]">{p.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-black text-white">{p.price}</span>
                <span className="text-slate-400 text-sm">{p.period}</span>
              </div>
              <ul className="mt-8 space-y-3 text-xs text-slate-300">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10">
              <Link
                href="/register"
                className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center transition-all ${
                  p.highlighted
                    ? 'bg-cyber-blue text-white shadow-neon-blue hover:scale-[1.02]'
                    : 'bg-[#152554] text-white hover:bg-cyber-blue'
                }`}
              >
                {p.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
