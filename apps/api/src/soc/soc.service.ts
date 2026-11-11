import { Injectable } from '@nestjs/common';

@Injectable()
export class SocService {
  private threatFeeds = [
    {
      id: 'ioc-1092',
      indicator: '194.26.29.112',
      type: 'IP',
      threatLevel: 'CRITICAL',
      description: 'Active C2 Cobalt Strike beacon listener',
      reportedAt: '5 min ago',
    },
    {
      id: 'ioc-1093',
      indicator: 'login-secure-auth-update.xyz',
      type: 'DOMAIN',
      threatLevel: 'HIGH',
      description: 'Spear-phishing credential harvesting landing page',
      reportedAt: '18 min ago',
    },
    {
      id: 'ioc-1094',
      indicator: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      type: 'HASH',
      threatLevel: 'CRITICAL',
      description: 'LockBit 3.0 Encryptor payload variant',
      reportedAt: '34 min ago',
    },
    {
      id: 'ioc-1095',
      indicator: '45.148.10.78',
      type: 'IP',
      threatLevel: 'MEDIUM',
      description: 'Port scanning activity (SSH brute-force targeting)',
      reportedAt: '1 hour ago',
    },
  ];

  getMetrics() {
    return {
      activeThreatsBlockedToday: 684,
      totalEventsProcessed24h: 1845200,
      averageDetectionLatencyMs: 42,
      mitreTacticsObserved: [
        { tactic: 'Initial Access', count: 142 },
        { tactic: 'Execution', count: 28 },
        { tactic: 'Persistence', count: 16 },
        { tactic: 'Privilege Escalation', count: 7 },
        { tactic: 'Defense Evasion', count: 89 },
        { tactic: 'Credential Access', count: 54 },
      ],
      systemHealth: 'OPTIMAL',
      socStaffOnDuty: 4,
    };
  }

  getThreatFeeds() {
    return this.threatFeeds;
  }
}
