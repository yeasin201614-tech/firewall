'use client';

import React, { useState } from 'react';
import {
  Smartphone,
  Laptop,
  Server,
  Tablet,
  CheckCircle2,
  Trash2,
  ShieldCheck,
  Radio,
} from 'lucide-react';

export default function DashboardDevicesPage() {
  const [devices, setDevices] = useState([
    {
      id: 'd-1',
      name: 'Google Pixel 9 Pro (This Device)',
      type: 'MOBILE',
      os: 'Android 15 (Security Patch Nov 2026)',
      ip: '192.168.1.145',
      status: 'ONLINE',
      score: 99,
      icon: <Smartphone className="w-5 h-5 text-emerald-400" />,
      isCurrent: true,
    },
    {
      id: 'd-2',
      name: 'MacBook Pro M3 Max',
      type: 'DESKTOP',
      os: 'macOS Sequoia 15.1',
      ip: '192.168.1.180',
      status: 'ONLINE',
      score: 96,
      icon: <Laptop className="w-5 h-5 text-cyber-blue" />,
      isCurrent: false,
    },
    {
      id: 'd-3',
      name: 'Workstation Extreme',
      type: 'DESKTOP',
      os: 'Windows 11 Enterprise 24H2',
      ip: '192.168.1.205',
      status: 'ONLINE',
      score: 94,
      icon: <Laptop className="w-5 h-5 text-cyber-cyan" />,
      isCurrent: false,
    },
    {
      id: 'd-4',
      name: 'Executive iPad Pro 13',
      type: 'TABLET',
      os: 'iPadOS 18.0.2',
      ip: '192.168.1.112',
      status: 'ONLINE',
      score: 98,
      icon: <Tablet className="w-5 h-5 text-purple-400" />,
      isCurrent: false,
    },
    {
      id: 'd-5',
      name: 'SOC Edge Gateway Node',
      type: 'SERVER',
      os: 'Ubuntu 24.04 LTS Hardened',
      ip: '10.0.10.1',
      status: 'ONLINE',
      score: 95,
      icon: <Server className="w-5 h-5 text-amber-400" />,
      isCurrent: false,
    },
  ]);

  const revokeDevice = (id: string) => {
    setDevices(devices.filter((d) => d.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">Registered Devices</h1>
        <p className="text-xs text-slate-400 mt-1">
          Endpoint trust enrollment, active session telemetry, and hardware enclave states.
        </p>
      </div>

      <div className="space-y-4">
        {devices.map((device) => (
          <div
            key={device.id}
            className="p-6 rounded-2xl bg-[#0A1330] border border-cyber-blue/30 hover:border-cyber-blue transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-glass-card"
          >
            <div className="flex items-start sm:items-center gap-4">
              <div className="p-3.5 rounded-xl bg-[#101D42] border border-white/10 shrink-0">
                {device.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{device.name}</h3>
                  {device.isCurrent && (
                    <span className="px-2 py-0.5 rounded-full bg-cyber-blue/20 border border-cyber-cyan/40 text-cyber-cyan text-[10px] font-bold">
                      Current Device
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  OS: {device.os} • IP: {device.ip}
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <span className="flex items-center gap-1.5 text-cyber-green font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{device.status}</span>
                  </span>
                  <span className="text-slate-400 font-mono">
                    Trust Score: <strong className="text-cyber-cyan">{device.score}/100</strong>
                  </span>
                </div>
              </div>
            </div>

            {!device.isCurrent && (
              <button
                onClick={() => revokeDevice(device.id)}
                className="px-4 py-2 rounded-xl bg-[#101D42] hover:bg-rose-950/60 border border-white/10 hover:border-rose-500 text-slate-300 hover:text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors self-end sm:self-center"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Revoke Session</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
