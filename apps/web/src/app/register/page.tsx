'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, User, Mail, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { isSupabaseConfigured, signUpWithSupabase } from '@/lib/supabase';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const cleanEmail = email.trim().toLowerCase();

    if (isSupabaseConfigured) {
      try {
        const data = await signUpWithSupabase(cleanEmail, password, fullName.trim(), 'USER');
        const user = {
          id: data.user?.id || `usr-${Date.now()}`,
          fullName: fullName.trim(),
          email: cleanEmail,
          role: 'USER',
          securityScore: 98,
        };
        localStorage.setItem('firewall_token', data.session?.access_token || 'supabase-token');
        localStorage.setItem('firewall_user', JSON.stringify(user));
        router.push('/dashboard');
        return;
      } catch (err: any) {
        setError(err.message || 'Supabase registration failed');
        setLoading(false);
        return;
      }
    }

    setTimeout(() => {
      setLoading(false);
      const user = {
        id: `usr-${Date.now()}`,
        fullName,
        email,
        role: 'USER',
        securityScore: 88,
      };
      localStorage.setItem('firewall_token', 'token-registered-user');
      localStorage.setItem('firewall_user', JSON.stringify(user));
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 cyber-grid">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#0A1330]/95 border border-cyber-blue/30 backdrop-blur-xl shadow-glass-card">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyber-blue to-cyber-cyan flex items-center justify-center mx-auto mb-4 shadow-neon-blue">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-black text-white">Create Protected Account</h2>
          <p className="text-xs text-slate-400 mt-1">Enroll in the 12-in-1 Zero-Trust Ecosystem</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-cyber-red/10 border border-cyber-red/30 flex items-center space-x-3 text-cyber-red text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Yeasin Arafat"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#050B1F] border border-white/20 text-white text-sm focus:outline-none focus:border-cyber-cyan"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@enterprise.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#050B1F] border border-white/20 text-white text-sm focus:outline-none focus:border-cyber-cyan"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 10 characters with symbols"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#050B1F] border border-white/20 text-white text-sm focus:outline-none focus:border-cyber-cyan"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-cyber-blue text-white font-bold text-sm shadow-neon-blue hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-cyber-cyan font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
