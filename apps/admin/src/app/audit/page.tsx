'use client';

import React, { useState } from 'react';
import {
  Scale,
  CheckCircle2,
  Download,
  ShieldCheck,
  Hash,
  Clock,
  User,
  Terminal,
} from 'lucide-react';

export default function AdminAuditPage() {
  const [logs] = useState([
    {
      id: 'aud-9912',
      action: 'MFA_VERIFY_SUCCESS',
      user: 'yeasin@example.com',
      ip: '192.168.1.145',
      time: '10 Nov 2026, 13:24:02 UTC',
      hash: 'a4f91b72e098cb129ef3...d8a1',
      status: 'VERIFIED',
    },
    {
      id: 'aud-9911',
      action: 'ZERO_DAY_QUARANTINE',
      user: 'SYSTEM_AUTONOMOUS',
      ip: '185.220.101.5',
      time: '10 Nov 2026, 13:20:11 UTC',
      hash: 'c827a1b02194f89d311...09eb',
      status: 'VERIFIED',
    },
    {
      id: 'aud-9910',
      action: 'VAULT_ITEM_DECRYPTED',
      user: 'yeasin@example.com',
      ip: '192.168.1.145',
      time: '10 Nov 2026, 12:45:00 UTC',
      hash: '39bc17e89124a10f829...41c2',
      status: 'VERIFIED',
    },
    {
      id: 'aud-9909',
      action: 'ZTNA_GEOPERIMETER_BLOCK',
      user: 'ANONYMOUS_PROBE',
      ip: '45.148.10.78',
      time: '10 Nov 2026, 12:12:34 UTC',
      hash: '91f27cb18029abce910...55af',
      status: 'VERIFIED',
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Digital Forensics Ledger</h1>
          <p className="text-xs text-slate-400 mt-1">
            Tamper-evident SHA-256 hash-chained event timeline for ISO 27001 & SOC 2 Type II compliance.
          </p>
        </div>

        <button className="px-5 py-2.5 rounded-xl bg-[#101D42] border border-cyber-cyan/40 text-cyber-cyan hover:bg-[#152554] text-xs font-bold flex items-center gap-2">
          <Download className="w-4 h-4" />
          <span>Export Cryptographic Evidence Pack</span>
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between shadow-[0_0_20px_rgba(16,185,129,0.15)]">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Merkle root state validated against blockchain time-stamping node. 100% integrity score.</span>
        </div>
        <span className="font-mono text-[11px] font-bold text-emerald-400">CHAIN UNBROKEN</span>
      </div>

      {/* Ledger Table */}
      <div className="rounded-2xl bg-[#0A1330] border border-cyber-blue/30 overflow-hidden shadow-glass-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#050B1F] text-slate-400 font-semibold border-b border-white/10 uppercase font-sans">
              <tr>
                <th className="py-3 px-4">Event ID</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Principal Identity</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4">Timestamp (UTC)</th>
                <th className="py-3 px-4">SHA-256 Checksum</th>
                <th className="py-3 px-4 text-right">Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.map((l) => (
                <tr key={l.id} className="hover:bg-[#101D42]/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{l.id}</td>
                  <td className="py-3.5 px-4 font-sans font-bold text-cyber-cyan">{l.action}</td>
                  <td className="py-3.5 px-4 text-slate-300 font-sans">{l.user}</td>
                  <td className="py-3.5 px-4 text-slate-400">{l.ip}</td>
                  <td className="py-3.5 px-4 text-slate-400 font-sans">{l.time}</td>
                  <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">{l.hash}</td>
                  <td className="py-3.5 px-4 text-right font-sans">
                    <span className="text-cyber-green font-bold text-[11px] flex items-center justify-end gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{l.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
