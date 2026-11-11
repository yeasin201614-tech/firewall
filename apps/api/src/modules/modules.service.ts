import { Injectable, NotFoundException } from '@nestjs/common';
import {
  SecurityModule,
  SecurityModuleId,
  PhishingCheckResult,
  NetworkScanState,
} from '@firewall/shared-types';
import { EventsGateway } from '../gateway/events.gateway';

@Injectable()
export class ModulesService {
  private modules: Map<SecurityModuleId, SecurityModule> = new Map();

  constructor(private eventsGateway: EventsGateway) {
    this.init12Modules();
  }

  private init12Modules() {
    const list: SecurityModule[] = [
      {
        id: SecurityModuleId.IDENTITY_GUARDIAN,
        name: 'Identity Guardian',
        tagline: 'Digital identity & account protection',
        category: 'IDENTITY',
        status: 'SECURE',
        score: 98,
        features: [
          'Secure Login & MFA',
          'Login Activity Monitor',
          'Account Security Score',
          'Breach Alert Service',
        ],
        lastScanTime: '10 Nov 2026, 09:41 AM',
        threatsBlocked: 14,
        summary: 'Biometric verification active, no unauthorized credentials found.',
      },
      {
        id: SecurityModuleId.PHISHING_SHIELD,
        name: 'Phishing Shield',
        tagline: 'Detect and block phishing threats',
        category: 'NETWORK',
        status: 'SECURE',
        score: 96,
        features: [
          'Real-time URL Heuristics',
          'Malicious Domain Database',
          'Zero-Hour Threat Defense',
          'Email Attachment Sandboxing',
        ],
        lastScanTime: '10 Nov 2026, 11:20 AM',
        threatsBlocked: 42,
        summary: 'All links scanned in real-time with SSL integrity verification.',
      },
      {
        id: SecurityModuleId.ENDPOINT_GUARDIAN,
        name: 'Endpoint Guardian',
        tagline: 'Hardware trust root & mobile defense',
        category: 'ENDPOINT',
        status: 'SECURE',
        score: 100,
        features: [
          'Keystore Enclave Hardware Encryption',
          'Root & Jailbreak Detection',
          'App Signature Verification',
          'OS Patch Vulnerability Scanner',
        ],
        lastScanTime: '10 Nov 2026, 08:15 AM',
        threatsBlocked: 8,
        summary: 'Hardware cryptographic enclave verified. OS runtime authentic.',
      },
      {
        id: SecurityModuleId.NETWORK_SENTINEL,
        name: 'Network Sentinel',
        tagline: 'Wi-Fi security & packet inspection',
        category: 'NETWORK',
        status: 'SECURE',
        score: 94,
        features: [
          'Open Wi-Fi Vulnerability Scan',
          'ARP Spoofing & MITM Detection',
          'DNS Hijacking Prevention',
          'Rogue Access Point Neutralizer',
        ],
        lastScanTime: '10 Nov 2026, 12:05 PM',
        threatsBlocked: 27,
        summary: 'Connected network encrypted via WPA3. Gateway fingerprint authenticated.',
      },
      {
        id: SecurityModuleId.VAULT_GUARDIAN,
        name: 'Vault Guardian',
        tagline: 'Zero-knowledge encrypted security vault',
        category: 'DATA',
        status: 'SECURE',
        score: 100,
        features: [
          'AES-256-GCM Master Key Encryption',
          'Zero-Knowledge Client-Side Derivation',
          'Biometric Quick-Unlock',
          'Encrypted Credentials & Secure Notes',
        ],
        lastScanTime: '10 Nov 2026, 10:00 AM',
        threatsBlocked: 0,
        summary: 'All vaults locked with PBKDF2 100,000 salt iterations.',
      },
      {
        id: SecurityModuleId.RANSOMWARE_GUARDIAN,
        name: 'Ransomware Guardian',
        tagline: 'File canary & active entropy defense',
        category: 'ENDPOINT',
        status: 'SECURE',
        score: 99,
        features: [
          'Cryptographic Honeypot Traps',
          'Mass File Modification Blocker',
          'Process Memory Behavioral Analysis',
          'Shadow Copy Auto-Protection',
        ],
        lastScanTime: '10 Nov 2026, 07:30 AM',
        threatsBlocked: 5,
        summary: 'Zero unauthorized file encryption attempts detected.',
      },
      {
        id: SecurityModuleId.WEBSHIELD,
        name: 'WebShield',
        tagline: 'Secure DNS-over-HTTPS & tracker sinkhole',
        category: 'NETWORK',
        status: 'SECURE',
        score: 97,
        features: [
          'DoH (DNS over HTTPS) Encryption',
          'Ad & Telemetry Tracker Sinkhole',
          'Malicious Script Injection Blocker',
          'Strict HSTS & Content-Security Policy',
        ],
        lastScanTime: '10 Nov 2026, 09:12 AM',
        threatsBlocked: 116,
        summary: 'Encrypted DNS resolver active. 116 tracking cookies filtered.',
      },
      {
        id: SecurityModuleId.DIGITAL_FORENSICS,
        name: 'Digital Forensics',
        tagline: 'Audit trail & chain of custody preservation',
        category: 'INTELLIGENCE',
        status: 'SECURE',
        score: 99,
        features: [
          'SHA-256 Hash Chained Logs',
          'Tamper-Evident Event Ledger',
          'Incident Timeline Replay',
          'Exportable Compliance Evidence Packs',
        ],
        lastScanTime: '10 Nov 2026, 06:00 AM',
        threatsBlocked: 2,
        summary: 'Audit ledger hashes cryptographically verified.',
      },
      {
        id: SecurityModuleId.ACCESS_GUARDIAN,
        name: 'Access Guardian',
        tagline: 'Zero-Trust network access & geofencing',
        category: 'IDENTITY',
        status: 'SECURE',
        score: 95,
        features: [
          'Context-Aware Conditional Access',
          'Geofenced IP Range Authorization',
          'Concurrent Session Anomalies',
          'Instant Device Revocation',
        ],
        lastScanTime: '10 Nov 2026, 11:45 AM',
        threatsBlocked: 19,
        summary: '1 unauthorized connection attempt from unknown IP rejected.',
      },
      {
        id: SecurityModuleId.THREAT_INTELLIGENCE,
        name: 'Threat Intelligence',
        tagline: 'Global IOC feeds & CVE vulnerability sync',
        category: 'INTELLIGENCE',
        status: 'SECURE',
        score: 98,
        features: [
          'STIX / TAXII Global Feed Ingestion',
          'CVE Zero-Day Database Correlation',
          'Dark Web Identity Leak Surveillance',
          'IP & Domain Reputation Scoring',
        ],
        lastScanTime: '10 Nov 2026, 12:30 PM',
        threatsBlocked: 340,
        summary: 'Over 1.2M threat indicators synchronized in the last 24h.',
      },
      {
        id: SecurityModuleId.CLOUD_BACKUP_GUARDIAN,
        name: 'Cloud Backup Guardian',
        tagline: 'Immutable disaster recovery snapshots',
        category: 'DATA',
        status: 'SECURE',
        score: 100,
        features: [
          'End-to-End Encrypted Cloud Sync',
          'Point-in-Time Snapshot Rollback',
          'Ransomware-Proof Read-Only Storage',
          'Automated Scheduled Backups',
        ],
        lastScanTime: '10 Nov 2026, 08:41 AM',
        threatsBlocked: 0,
        summary: 'Latest snapshot verified (1.4 GB). Cloud sync 100% healthy.',
      },
      {
        id: SecurityModuleId.CYBER_SOC,
        name: 'Cyber SOC',
        tagline: 'Central SIEM security operations command',
        category: 'INTELLIGENCE',
        status: 'SECURE',
        score: 99,
        features: [
          '24/7 Real-Time Telemetry Processing',
          'Automated SOAR Remediation Playbooks',
          'Threat Severity Correlation Engine',
          'SOC Analyst Escalation Queue',
        ],
        lastScanTime: '10 Nov 2026, 12:35 PM',
        threatsBlocked: 87,
        summary: 'All nodes operating within normal baseline latency and noise levels.',
      },
    ];

    for (const m of list) {
      this.modules.set(m.id, m);
    }
  }

  getAllModules(): SecurityModule[] {
    return Array.from(this.modules.values());
  }

  getModule(id: SecurityModuleId): SecurityModule {
    const mod = this.modules.get(id);
    if (!mod) {
      throw new NotFoundException(`Security module ${id} not found.`);
    }
    return mod;
  }

  async runModuleScan(id: SecurityModuleId): Promise<{ scanId: string; status: string }> {
    const mod = this.getModule(id);
    mod.status = 'SCANNING';

    // Broadcast scan progress via WebSocket
    setTimeout(() => this.eventsGateway.broadcastScanProgress(id, 25, 'Analyzing signatures...'), 300);
    setTimeout(() => this.eventsGateway.broadcastScanProgress(id, 68, 'Checking network risks & vulnerabilities...'), 900);
    setTimeout(() => {
      mod.status = 'SECURE';
      mod.lastScanTime = new Date().toLocaleString('en-GB');
      this.eventsGateway.broadcastScanProgress(id, 100, 'Scan completed. All clear.');
    }, 1800);

    return {
      scanId: `scan-${Date.now()}`,
      status: 'STARTED',
    };
  }

  async checkPhishingUrl(url: string): Promise<PhishingCheckResult> {
    const cleanUrl = url.trim().toLowerCase();
    const isSuspicious =
      cleanUrl.includes('phish') ||
      cleanUrl.includes('verify-account-update') ||
      cleanUrl.includes('free-crypto') ||
      cleanUrl.includes('login-security-update.xyz');

    if (isSuspicious) {
      return {
        url,
        isSafe: false,
        threatCategory: 'PHISHING',
        domainAgeDays: 3,
        sslValid: false,
        reputationScore: 12,
        lastChecked: new Date().toLocaleString('en-GB'),
        details: 'High-confidence deceptive login portal matching credential harvesting patterns.',
      };
    }

    return {
      url,
      isSafe: true,
      threatCategory: 'CLEAN',
      domainAgeDays: 1420,
      sslValid: true,
      reputationScore: 98,
      lastChecked: new Date().toLocaleString('en-GB'),
      details: 'This link is safe to visit. Valid TLS certificate issued by trusted CA.',
    };
  }

  async scanNetwork(): Promise<NetworkScanState> {
    return {
      isScanning: false,
      progress: 100,
      currentStep: 'Network Analysis Completed',
      ssid: 'Firewall_Corp_Secure_5G',
      bssid: 'A4:C3:61:9F:88:12',
      encryption: 'WPA3 Enterprise (SAE / 256-bit)',
      ipAddress: '192.168.1.145',
      gateway: '192.168.1.1',
      openPorts: [443, 22],
      vulnerabilities: [],
      riskLevel: 'LOW',
    };
  }
}
