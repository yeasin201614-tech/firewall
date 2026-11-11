import React from 'react';
import { ShieldCheck, Zap, Lock, RefreshCw, Smartphone, Server, Globe2, EyeOff } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      title: 'Autonomous Threat Neutralization',
      desc: 'Machine-speed heuristic engines detect and terminate malware, spyware, and unauthorized network taps in under 42 milliseconds.',
      icon: <Zap className="w-6 h-6 text-cyber-blue" />,
    },
    {
      title: 'Hardware Keystore Cryptography',
      desc: 'Keys never leave the hardware secure element (Titan M2 / TrustZone). BiometricPrompt ensures only your physical presence unlocks sensitive actions.',
      icon: <Lock className="w-6 h-6 text-cyber-cyan" />,
    },
    {
      title: 'Zero-Knowledge Vault',
      desc: 'Passwords, SSH keys, recovery seeds, and critical tokens are encrypted on-device with AES-256-GCM. We never see your master key or data.',
      icon: <EyeOff className="w-6 h-6 text-cyber-orange" />,
    },
    {
      title: 'Cross-Platform Mesh Defense',
      desc: 'Android, macOS, Windows, Linux, and Cloud servers share real-time threat telemetry via encrypted WebSockets to isolate infected nodes instantly.',
      icon: <Server className="w-6 h-6 text-cyber-green" />,
    },
    {
      title: 'Encrypted DNS-over-HTTPS',
      desc: 'Bypasses ISP eavesdropping and blocks malicious C2 domains at the DNS resolver level with zero telemetry leakage.',
      icon: <Globe2 className="w-6 h-6 text-purple-400" />,
    },
    {
      title: 'Immutable Cloud Snapshots',
      desc: 'Continuous differential backups stored in WORM (Write Once, Read Many) cloud storage, completely immune to ransomware deletion.',
      icon: <RefreshCw className="w-6 h-6 text-sky-400" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase font-bold tracking-widest text-cyber-blue">Core Capabilities</span>
        <h1 className="text-4xl sm:text-6xl font-black text-white mt-2">
          Engineered for Total Sovereignty
        </h1>
        <p className="text-slate-400 text-lg mt-4">
          Discover why high-threat individuals, enterprises, and cybersecurity teams rely on FIREWALL.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="p-8 rounded-2xl bg-[#0A1330] border border-cyber-blue/20 hover:border-cyber-blue transition-all duration-300 backdrop-blur-md">
            <div className="p-3 w-fit rounded-xl bg-[#101D42] mb-5 border border-white/10">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
