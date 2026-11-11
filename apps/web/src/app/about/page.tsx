import React from 'react';
import { Shield, Lock, Eye, Cpu, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase font-bold tracking-widest text-cyber-cyan">About The Platform</span>
        <h1 className="text-4xl sm:text-6xl font-black text-white mt-2">
          Defending Digital Humanity
        </h1>
        <p className="text-slate-400 text-lg mt-4 leading-relaxed">
          FIREWALL was architected to dismantle the fragmentation of enterprise cybersecurity. Instead of twelve disconnected vendors, we engineered one unified, self-healing cyber ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
        <div className="p-8 rounded-2xl bg-[#0A1330] border border-cyber-blue/30 backdrop-blur-md">
          <div className="p-3 w-fit rounded-xl bg-cyber-blue/20 text-cyber-blue mb-4">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Our Core Mission</h3>
          <p className="text-slate-400 leading-relaxed">
            To provide impenetrable defense for individuals, developers, and global enterprises without sacrificing speed, battery life, or privacy. Zero-knowledge by design.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[#0A1330] border border-cyber-cyan/30 backdrop-blur-md">
          <div className="p-3 w-fit rounded-xl bg-cyber-cyan/20 text-cyber-cyan mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Zero-Trust Philosophy</h3>
          <p className="text-slate-400 leading-relaxed">
            Perimeter defenses have fallen. FIREWALL assumes breach from day zero, enforcing hardware-backed cryptographic verification on every packet, API call, and file access.
          </p>
        </div>
      </div>

      <div className="rounded-3xl p-10 bg-gradient-to-br from-[#081842] to-[#0A1330] border border-cyber-blue/40 shadow-neon-blue my-16">
        <h2 className="text-3xl font-black text-white mb-6">SIS Cyber Fortress Engineering Foundation</h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
          <p>
            FIREWALL is strictly engineered upon the <strong>SIS Cyber Fortress Framework</strong>, complying with NIST SP 800-218 Secure Software Development Framework (SSDF), OWASP ASVS 5.0 Level 3, and FIPS 140-3 cryptographic standards.
          </p>
          <p>
            Our native Android application leverages Android Keystore hardware-backed secure enclaves, BiometricPrompt Tier 3 biometric authentication, and WorkManager encrypted background scanners.
          </p>
        </div>
      </div>
    </div>
  );
}
