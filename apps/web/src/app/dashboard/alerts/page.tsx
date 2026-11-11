'use client';

import React, { useState, useEffect } from 'react';
import {
  Bell,
  AlertTriangle,
  ShieldAlert,
  Info,
  CheckCircle2,
  Trash2,
  Clock,
  MapPin,
  Smartphone,
  ExternalLink,
  Radio,
} from 'lucide-react';
import { supabase, isSupabaseConfigured, subscribeToRealtimeAlerts } from '@/lib/supabase';

export default function DashboardAlertsPage() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'CRITICAL' | 'WARNING' | 'INFO'>('ALL');
  const [alerts, setAlerts] = useState([
    {
      id: 'alt-1',
      title: 'Suspicious Login Attempt',
      desc: 'Unknown device from London, UK attempted credential handshake.',
      time: '2 min ago',
      severity: 'CRITICAL',
      resolved: false,
      ip: '185.220.101.5',
      location: 'London, United Kingdom',
      device: 'Tor Exit Node / Linux x86_64',
    },
    {
      id: 'alt-2',
      title: 'Open Wi-Fi Network',
      desc: 'Public Wi-Fi detected without 802.1X enterprise tunnel.',
      time: '15 min ago',
      severity: 'WARNING',
      resolved: false,
      ip: '192.168.4.1',
      location: 'Local Wireless Scan',
      device: 'wlan0 Interface',
    },
    {
      id: 'alt-3',
      title: 'Backup Completed',
      desc: 'Your data is safely backed up to immutable cloud vault.',
      time: '1 hour ago',
      severity: 'INFO',
      resolved: true,
      ip: '10.0.10.1',
      location: 'Cloud Backup Region us-east',
      device: 'Automated Snapshot Service',
    },
  ]);

  const [realtimeActive, setRealtimeActive] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    // Fetch alerts from Supabase
    const fetchAlerts = async () => {
      try {
        const { data, error } = await supabase
          .from('security_alerts')
          .select('*')
          .order('created_at', { ascending: false });

        if (data && data.length > 0) {
          const mapped = data.map((d: any) => ({
            id: d.id,
            title: d.title,
            desc: d.description,
            time: 'Just now',
            severity: d.severity || 'INFO',
            resolved: d.resolved || false,
            ip: d.ip_address || '127.0.0.1',
            location: d.location || 'Encrypted Node',
            device: d.device || 'Firewall Endpoint',
          }));
          setAlerts(mapped);
        }
      } catch (err) {
        console.warn('Supabase alerts fetch fallback to demo records:', err);
      }
    };

    fetchAlerts();

    // Subscribe to realtime security alerts
    const channel = supabase
      .channel('public:security_alerts')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'security_alerts' },
        (payload) => {
          const d: any = payload.new;
          setAlerts((prev) => [
            {
              id: d.id,
              title: d.title,
              desc: d.description,
              time: 'Just now',
              severity: d.severity || 'INFO',
              resolved: d.resolved || false,
              ip: d.ip_address || '127.0.0.1',
              location: d.location || 'Encrypted Node',
              device: d.device || 'Firewall Endpoint',
            },
            ...prev,
          ]);
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setRealtimeActive(true);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filtered = alerts.filter((a) => {
    if (activeTab === 'ALL') return true;
    return a.severity === activeTab;
  });

  const resolveAlert = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, resolved: true } : a)));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-white">Security Alerts</h1>
            <span className="w-6 h-6 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center">
              {alerts.filter((a) => !a.resolved).length}
            </span>
            {realtimeActive && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[11px] font-bold animate-pulse">
                <Radio className="w-3 h-3" />
                Supabase Realtime Live
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time attack telemetry, anomaly detections, and defensive actions.
          </p>
        </div>
      </div>

      {/* Filter Tabs (Exact match to Mobile Screenshot: All (3), Critical, Warning, Info) */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'ALL'
              ? 'bg-cyber-blue text-white shadow-neon-blue'
              : 'bg-[#101D42] text-slate-400 hover:text-white'
          }`}
        >
          All ({alerts.length})
        </button>
        <button
          onClick={() => setActiveTab('CRITICAL')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'CRITICAL'
              ? 'bg-rose-500 text-white shadow-[0_0_20px_rgba(255,64,87,0.5)]'
              : 'bg-[#101D42] text-slate-400 hover:text-white'
          }`}
        >
          Critical ({alerts.filter((a) => a.severity === 'CRITICAL').length})
        </button>
        <button
          onClick={() => setActiveTab('WARNING')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'WARNING'
              ? 'bg-amber-500 text-slate-950 font-black shadow-[0_0_20px_rgba(245,158,11,0.5)]'
              : 'bg-[#101D42] text-slate-400 hover:text-white'
          }`}
        >
          Warning ({alerts.filter((a) => a.severity === 'WARNING').length})
        </button>
        <button
          onClick={() => setActiveTab('INFO')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'INFO'
              ? 'bg-cyan-500 text-slate-950 font-black shadow-[0_0_20px_rgba(6,182,212,0.5)]'
              : 'bg-[#101D42] text-slate-400 hover:text-white'
          }`}
        >
          Info ({alerts.filter((a) => a.severity === 'INFO').length})
        </button>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {filtered.map((alert) => {
          const isCritical = alert.severity === 'CRITICAL';
          const isWarning = alert.severity === 'WARNING';
          const isInfo = alert.severity === 'INFO';

          return (
            <div
              key={alert.id}
              className={`p-6 rounded-2xl border transition-all shadow-glass-card ${
                isCritical
                  ? 'bg-[#170B14] border-rose-500/40 hover:border-rose-500'
                  : isWarning
                  ? 'bg-[#17140B] border-amber-500/40 hover:border-amber-500'
                  : 'bg-[#0A1330] border-cyber-blue/30 hover:border-cyber-blue'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl mt-0.5 shrink-0 ${
                      isCritical
                        ? 'bg-rose-500/20 text-rose-400'
                        : isWarning
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-cyber-blue/20 text-cyber-blue'
                    }`}
                  >
                    {isCritical ? (
                      <ShieldAlert className="w-6 h-6" />
                    ) : isWarning ? (
                      <AlertTriangle className="w-6 h-6" />
                    ) : (
                      <Info className="w-6 h-6" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-white">{alert.title}</h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isCritical
                            ? 'bg-rose-500 text-white'
                            : isWarning
                            ? 'bg-amber-500 text-slate-950 font-extrabold'
                            : 'bg-cyan-500 text-slate-950 font-extrabold'
                        }`}
                      >
                        {alert.severity}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mt-1">{alert.desc}</p>

                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 mt-3 font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{alert.time}</span>
                      </span>
                      {alert.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>{alert.location}</span>
                        </span>
                      )}
                      {alert.ip && (
                        <span>IP: {alert.ip}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  {!alert.resolved ? (
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      className="px-4 py-2 rounded-xl bg-cyber-blue text-white text-xs font-bold shadow-neon-blue hover:scale-105 transition-all flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Acknowledge & Resolve</span>
                    </button>
                  ) : (
                    <span className="text-xs text-cyber-green font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Resolved</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
