'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase font-bold tracking-widest text-cyber-orange">24/7 Response</span>
        <h1 className="text-4xl sm:text-6xl font-black text-white mt-2">
          Contact Security Operations
        </h1>
        <p className="text-slate-400 text-lg mt-4">
          Report an emergency incident, schedule an enterprise security audit, or speak with a SOC engineer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Info Column */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#0A1330] border border-cyber-blue/30 backdrop-blur-md">
            <div className="p-3 w-fit rounded-xl bg-cyber-blue/20 text-cyber-blue mb-4">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Emergency Hotline</h3>
            <p className="text-xs text-slate-400 mt-1">For active ransomware or breach containment:</p>
            <div className="text-cyber-cyan font-mono font-bold mt-2 text-sm">+1 (800) 555-CYBER</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0A1330] border border-cyber-blue/30 backdrop-blur-md">
            <div className="p-3 w-fit rounded-xl bg-cyber-cyan/20 text-cyber-cyan mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Secure PGP Email</h3>
            <p className="text-xs text-slate-400 mt-1">PGP Key ID: 0x9F41C2B0</p>
            <div className="text-slate-200 font-mono text-xs mt-2">soc-team@firewall.cyber</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0A1330] border border-cyber-blue/30 backdrop-blur-md">
            <div className="p-3 w-fit rounded-xl bg-cyber-green/20 text-cyber-green mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Global Headquarters</h3>
            <p className="text-xs text-slate-400 mt-1">Fortress Cyber Defense Tower, San Francisco, CA</p>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-2 p-8 sm:p-10 rounded-3xl bg-[#0A1330] border border-cyber-blue/30 shadow-glass-card">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-cyber-green mx-auto animate-bounce" />
              <h3 className="text-2xl font-bold text-white">Message Securely Transmitted</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                Your incident ticket has been assigned a priority dispatch token. A standby SOC engineer will reach out within 15 minutes.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Yeasin Arafat"
                    className="w-full px-4 py-3 rounded-xl bg-[#050B1F] border border-white/20 text-white text-sm focus:outline-none focus:border-cyber-cyan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Corporate Email</label>
                  <input
                    required
                    type="email"
                    placeholder="name@enterprise.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#050B1F] border border-white/20 text-white text-sm focus:outline-none focus:border-cyber-cyan"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Inquiry Type</label>
                <select className="w-full px-4 py-3 rounded-xl bg-[#050B1F] border border-white/20 text-white text-sm focus:outline-none focus:border-cyber-cyan">
                  <option>Enterprise Deployment Consultation</option>
                  <option>Active Security Incident / Ransomware</option>
                  <option>Vulnerability Disclosure (Bug Bounty)</option>
                  <option>Technical Architecture & Integration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Message & Threat Context</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Describe your environment or security situation..."
                  className="w-full px-4 py-3 rounded-xl bg-[#050B1F] border border-white/20 text-white text-sm focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyber-blue to-[#0057C2] text-white font-bold text-sm shadow-neon-blue hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit to Security Operations</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
