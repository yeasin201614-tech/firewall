'use client';

import React, { useState } from 'react';
import {
  Database,
  Plus,
  ShieldAlert,
  Globe2,
  FileCode,
  Search,
  CheckCircle2,
  Trash2,
  RefreshCw,
} from 'lucide-react';

export default function AdminThreatsPage() {
  const [threats, setThreats] = useState([
    {
      id: 'ioc-1',
      indicator: '194.26.29.112',
      type: 'IP',
      severity: 'CRITICAL',
      source: 'AlienVault OTX & CISA KEV',
      desc: 'Active C2 Cobalt Strike beacon listener',
      reported: '5 min ago',
    },
    {
      id: 'ioc-2',
      indicator: 'login-secure-auth-update.xyz',
      type: 'DOMAIN',
      severity: 'HIGH',
      source: 'Phishing Shield AI Engine',
      desc: 'Spear-phishing credential harvesting landing page',
      reported: '18 min ago',
    },
    {
      id: 'ioc-3',
      indicator: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      type: 'HASH',
      severity: 'CRITICAL',
      source: 'Ransomware Canary Traps',
      desc: 'LockBit 3.0 Encryptor payload binary fingerprint',
      reported: '34 min ago',
    },
    {
      id: 'ioc-4',
      indicator: '45.148.10.78',
      type: 'IP',
      severity: 'MEDIUM',
      source: 'Network Sentinel Mesh',
      desc: 'SSH brute-force and port 443 fuzzing activity',
      reported: '1 hour ago',
    },
  ]);

  const [newIndicator, setNewIndicator] = useState('');
  const [newType, setNewType] = useState('IP');
  const [newSeverity, setNewSeverity] = useState('HIGH');
  const [newDesc, setNewDesc] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddThreat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIndicator) return;

    const entry = {
      id: `ioc-${Date.now()}`,
      indicator: newIndicator,
      type: newType,
      severity: newSeverity,
      source: 'Manual SOC Operator Push',
      desc: newDesc || 'Manually quarantined malicious indicator.',
      reported: 'Just now',
    };

    setThreats([entry, ...threats]);
    setNewIndicator('');
    setNewDesc('');
    setShowAddModal(false);
  };

  const removeThreat = (id: string) => {
    setThreats(threats.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Threat Intelligence Repository</h1>
          <p className="text-xs text-slate-400 mt-1">
            STIX/TAXII v2.1 real-time IOC indicator sync, malware hashes, and domain reputation.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-cyber-blue text-white font-bold text-xs shadow-neon-blue hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Ingest New IOC Indicator</span>
        </button>
      </div>

      {/* Threats Table */}
      <div className="rounded-2xl bg-[#0A1330] border border-cyber-blue/30 overflow-hidden shadow-glass-card">
        <div className="p-4 border-b border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Active Monitored Indicators ({threats.length})</span>
          <span className="font-mono text-cyber-cyan">Auto-Sync Interval: 15m</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#050B1F] text-slate-400 font-semibold border-b border-white/10 uppercase">
              <tr>
                <th className="py-3 px-4">Indicator</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Threat Level</th>
                <th className="py-3 px-4">Threat Intel Source</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {threats.map((t) => (
                <tr key={t.id} className="hover:bg-[#101D42]/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white max-w-xs truncate">{t.indicator}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold text-[10px]">
                      {t.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.severity === 'CRITICAL'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          : t.severity === 'HIGH'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-cyber-blue/20 text-cyber-cyan border border-cyber-blue/40'
                      }`}
                    >
                      {t.severity}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 font-sans">{t.source}</td>
                  <td className="py-3.5 px-4 text-slate-400 font-sans">{t.desc}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => removeThreat(t.id)}
                      className="p-1.5 rounded-lg bg-[#101D42] text-slate-400 hover:text-rose-400 transition-colors"
                      title="De-list Indicator"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md p-8 rounded-3xl bg-[#0A1330] border border-cyber-blue/50 shadow-neon-blue">
            <h3 className="text-xl font-black text-white mb-4">Ingest Threat Indicator</h3>
            <form onSubmit={handleAddThreat} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Indicator (IP, Domain, or Hash)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 194.26.29.112 or malicious-site.com"
                  value={newIndicator}
                  onChange={(e) => setNewIndicator(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#050B1F] border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050B1F] border border-white/20 text-white text-xs focus:outline-none focus:border-cyber-cyan"
                  >
                    <option value="IP">IP Address</option>
                    <option value="DOMAIN">Domain Name</option>
                    <option value="HASH">SHA-256 Hash</option>
                    <option value="URL">Full URL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Severity</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050B1F] border border-white/20 text-white text-xs focus:outline-none focus:border-cyber-cyan"
                  >
                    <option value="CRITICAL">Critical</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Reason for quarantine / campaign details..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#050B1F] border border-white/20 text-white text-xs focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-cyber-blue text-white font-bold text-xs shadow-neon-blue"
                >
                  Propagate to Mesh
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-3 rounded-xl bg-[#101D42] text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
