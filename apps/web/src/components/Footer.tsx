import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Award, Globe, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#02050E] border-t border-cyber-blue/20 text-slate-400 text-sm mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyber-blue flex items-center justify-center shadow-neon-blue">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-black">
                <span className="text-white">Fire</span>
                <span className="text-cyber-orange">wall</span>
              </div>
            </div>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
              12-in-1 Next-Generation Enterprise Cybersecurity Ecosystem. Safeguarding digital identities, endpoints, networks, cloud vaults, and infrastructure against state-sponsored threats and ransomware.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All SOC Systems Operational (99.9%)</span>
              </div>
            </div>
          </div>

          {/* Column 1: Ecosystem */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Ecosystem</h4>
            <ul className="space-y-2.5">
              <li><Link href="/modules" className="hover:text-cyber-cyan transition-colors">Identity Guardian</Link></li>
              <li><Link href="/modules" className="hover:text-cyber-cyan transition-colors">Phishing Shield</Link></li>
              <li><Link href="/modules" className="hover:text-cyber-cyan transition-colors">Endpoint Guardian</Link></li>
              <li><Link href="/modules" className="hover:text-cyber-cyan transition-colors">Network Sentinel</Link></li>
              <li><Link href="/modules" className="hover:text-cyber-cyan transition-colors">Vault Guardian</Link></li>
              <li><Link href="/modules" className="hover:text-cyber-cyan transition-colors">Ransomware Guardian</Link></li>
            </ul>
          </div>

          {/* Column 2: Advanced Modules */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Defense Suite</h4>
            <ul className="space-y-2.5">
              <li><Link href="/modules" className="hover:text-cyber-cyan transition-colors">WebShield DoH</Link></li>
              <li><Link href="/modules" className="hover:text-cyber-cyan transition-colors">Digital Forensics</Link></li>
              <li><Link href="/modules" className="hover:text-cyber-cyan transition-colors">Access Guardian ZTNA</Link></li>
              <li><Link href="/modules" className="hover:text-cyber-cyan transition-colors">Threat Intelligence</Link></li>
              <li><Link href="/modules" className="hover:text-cyber-cyan transition-colors">Cloud Backup Guardian</Link></li>
              <li><Link href="/modules" className="hover:text-cyber-cyan transition-colors">Cyber SOC SIEM</Link></li>
            </ul>
          </div>

          {/* Column 3: Trust & Legal */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Trust & Legal</h4>
            <ul className="space-y-2.5">
              <li><Link href="/privacy" className="hover:text-cyber-cyan transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-cyber-cyan transition-colors">Terms of Service</Link></li>
              <li><Link href="/about" className="hover:text-cyber-cyan transition-colors">Security Architecture</Link></li>
              <li><Link href="/contact" className="hover:text-cyber-cyan transition-colors">Report Vulnerability</Link></li>
              <li><Link href="/contact" className="hover:text-cyber-cyan transition-colors">Enterprise Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-12 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © {new Date().getFullYear()} FIREWALL Cybersecurity Inc. Powered by SIS Cyber Fortress specification.
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <span>SOC 2 Type II Certified</span>
            <span>•</span>
            <span>ISO/IEC 27001</span>
            <span>•</span>
            <span>FIPS 140-3 Cryptography</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
