'use client';

import React, { useState } from 'react';
import {
  Lock,
  KeyRound,
  FileText,
  CreditCard,
  Plus,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export default function DashboardVaultPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [items, setItems] = useState([
    {
      id: 'v-1',
      title: 'Enterprise GitHub SSH Key',
      category: 'NOTE',
      username: 'yeasin-secops',
      secret: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKs7...firewall-master-key',
      updatedAt: '10 Nov 2026, 09:15 AM',
    },
    {
      id: 'v-2',
      title: 'Production AWS Root Credentials',
      category: 'PASSWORD',
      username: 'root-admin@firewall.cyber',
      secret: 'sUp3r-S3cur3-Aws#K3y-2026-F1r3w4ll!',
      updatedAt: '08 Nov 2026, 04:30 PM',
    },
    {
      id: 'v-3',
      title: 'Hardware Token Recovery Seed',
      category: 'NOTE',
      username: 'Yeasin Arafat',
      secret: 'alpha shield fortress orbit neon cipher pulse vector quantum beacon anchor matrix',
      updatedAt: '01 Nov 2026, 10:00 AM',
    },
  ]);

  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemUsername, setNewItemUsername] = useState('');
  const [newItemSecret, setNewItemSecret] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle || !newItemSecret) return;

    const newItem = {
      id: `v-${Date.now()}`,
      title: newItemTitle,
      category: 'PASSWORD',
      username: newItemUsername || 'yeasin@example.com',
      secret: newItemSecret,
      updatedAt: 'Just now',
    };

    setItems([newItem, ...items]);
    setNewItemTitle('');
    setNewItemUsername('');
    setNewItemSecret('');
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Vault Guardian</h1>
          <p className="text-xs text-slate-400 mt-1">
            Zero-Knowledge Hardware-Derived Vault. Sealed with AES-256-GCM.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-cyber-blue text-white font-bold text-xs shadow-neon-blue hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Encrypted Record</span>
        </button>
      </div>

      {/* Security Status Card */}
      <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between shadow-[0_0_20px_rgba(16,185,129,0.15)]">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Master Key derived via PBKDF2 (100,000 iterations). Client-side memory scrub active.</span>
        </div>
        <span className="font-mono text-[11px] font-bold text-emerald-400">ENCLAVE LOCKED</span>
      </div>

      {/* Vault Items List */}
      <div className="space-y-4">
        {items.map((item) => {
          const isRevealed = revealedIds[item.id];
          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#0A1330] border border-cyber-blue/20 hover:border-cyber-blue/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-glass-card"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="p-3 rounded-xl bg-[#101D42] text-cyber-orange shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    User: {item.username} • Last modified: {item.updatedAt}
                  </div>
                  <div className="mt-2 font-mono text-xs text-cyber-cyan bg-[#050B1F] px-3 py-1.5 rounded-lg border border-white/10 inline-block">
                    {isRevealed ? item.secret : '••••••••••••••••••••••••••••••'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleReveal(item.id)}
                  className="p-2.5 rounded-xl bg-[#101D42] text-slate-300 hover:text-white transition-colors"
                  title={isRevealed ? 'Mask' : 'Reveal'}
                >
                  {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleCopy(item.id, item.secret)}
                  className="p-2.5 rounded-xl bg-[#101D42] text-slate-300 hover:text-white transition-colors"
                  title="Copy Secret"
                >
                  {copiedId === item.id ? (
                    <CheckCircle2 className="w-4 h-4 text-cyber-green" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2.5 rounded-xl bg-[#101D42] text-slate-400 hover:text-rose-400 transition-colors"
                  title="Delete Record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md p-8 rounded-3xl bg-[#0A1330] border border-cyber-blue/50 shadow-neon-blue">
            <h3 className="text-xl font-black text-white mb-4">Add Zero-Knowledge Secret</h3>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master DB Password"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#050B1F] border border-white/20 text-white text-xs focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Username / Identifier</label>
                <input
                  type="text"
                  placeholder="e.g. yeasin@example.com"
                  value={newItemUsername}
                  onChange={(e) => setNewItemUsername(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#050B1F] border border-white/20 text-white text-xs focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Confidential Secret / Key</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Paste confidential payload..."
                  value={newItemSecret}
                  onChange={(e) => setNewItemSecret(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#050B1F] border border-white/20 text-white text-xs focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-cyber-blue text-white font-bold text-xs shadow-neon-blue"
                >
                  Encrypt & Save
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
