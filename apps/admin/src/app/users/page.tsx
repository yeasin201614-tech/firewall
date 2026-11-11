'use client';

import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  UserPlus,
  KeyRound,
  Lock,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
} from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([
    {
      id: 'usr-1',
      name: 'Yeasin Arafat',
      email: 'yeasin@example.com',
      role: 'SUPER_USER',
      score: 98,
      mfa: true,
      devices: 5,
      lastLogin: 'Active now',
    },
    {
      id: 'usr-2',
      name: 'Chief Information Security Officer',
      email: 'admin@firewall.cyber',
      role: 'SUPER_ADMIN',
      score: 100,
      mfa: true,
      devices: 2,
      lastLogin: '10 min ago',
    },
    {
      id: 'usr-3',
      name: 'Elena Rostova',
      email: 'elena.soc@firewall.cyber',
      role: 'SOC_ANALYST',
      score: 97,
      mfa: true,
      devices: 3,
      lastLogin: '25 min ago',
    },
    {
      id: 'usr-4',
      name: 'Marcus Vance',
      email: 'marcus@corp-acme.com',
      role: 'USER',
      score: 84,
      mfa: false,
      devices: 1,
      lastLogin: '1 day ago',
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Identity & RBAC Governance</h1>
          <p className="text-xs text-slate-400 mt-1">
            Zero-Trust access policies, hardware MFA enforcement, and privileged session control.
          </p>
        </div>

        <button className="px-5 py-2.5 rounded-xl bg-cyber-blue text-white font-bold text-xs shadow-neon-blue flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          <span>Provision Enterprise User</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl bg-[#0A1330] border border-cyber-blue/30 overflow-hidden shadow-glass-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#050B1F] text-slate-400 font-semibold border-b border-white/10 uppercase">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Security Score</th>
                <th className="py-3 px-4">Hardware MFA</th>
                <th className="py-3 px-4">Enrolled Devices</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#101D42]/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{u.name}</div>
                    <div className="text-slate-400 text-[11px] font-mono">{u.email}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        u.role === 'SUPER_ADMIN'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : u.role === 'SUPER_USER'
                          ? 'bg-cyber-blue/20 text-cyber-cyan border border-cyber-blue/40'
                          : u.role === 'SOC_ANALYST'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold">
                    <span className={u.score >= 95 ? 'text-cyber-green' : 'text-amber-400'}>
                      {u.score}/100
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {u.mfa ? (
                      <span className="text-cyber-green flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Enforced (FIDO2/TOTP)</span>
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Unenforced</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-mono">{u.devices} Devices</td>
                  <td className="py-3.5 px-4 text-slate-400">{u.lastLogin}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-xs text-cyber-cyan hover:underline font-semibold">
                      Inspect Access
                    </button>
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
