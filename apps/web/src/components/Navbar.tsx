'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Menu, X, ArrowRight, Lock } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If inside dashboard, the dashboard has its own specialized navigation
  if (pathname.startsWith('/dashboard')) {
    return null;
  }

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/features' },
    { label: 'Security Modules', href: '/modules' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#050B1F]/80 border-b border-cyber-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyber-blue to-cyber-cyan flex items-center justify-center shadow-neon-blue group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6 text-white fill-white/20" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyber-orange rounded-full animate-ping" />
          </div>
          <div className="flex flex-col">
            <div className="text-2xl font-black tracking-tight leading-none">
              <span className="text-white">Fire</span>
              <span className="bg-gradient-to-r from-[#FF6A00] to-[#FFAA00] bg-clip-text text-transparent">
                wall
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">
              Your Digital World, Protected.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-cyber-cyan shadow-[0_0_10px_rgba(0,217,255,0.4)]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-semibold text-slate-200 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Lock className="w-4 h-4 text-cyber-blue" />
            <span>Sign In</span>
          </Link>
          <Link
            href="/register"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-blue to-[#0057C2] text-white font-bold text-sm shadow-neon-blue hover:shadow-[0_0_30px_rgba(8,123,255,0.8)] hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 border border-blue-400/40"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A1330] border-b border-cyber-blue/30 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-slate-200 hover:text-cyber-cyan py-1"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl border border-white/20 text-slate-200 font-semibold"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-cyber-blue text-white font-bold shadow-neon-blue"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
