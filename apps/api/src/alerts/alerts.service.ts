import { Injectable, NotFoundException } from '@nestjs/common';
import { SecurityAlert, AlertSeverity, SecurityModuleId } from '@firewall/shared-types';
import { EventsGateway } from '../gateway/events.gateway';

@Injectable()
export class AlertsService {
  private alerts: SecurityAlert[] = [];

  constructor(private eventsGateway: EventsGateway) {
    this.seedAlerts();
  }

  private seedAlerts() {
    this.alerts = [
      {
        id: 'alt-001',
        title: 'Suspicious Login Attempt',
        description: 'Unknown device from London, UK attempted credential handshake.',
        timestamp: '2 min ago',
        severity: AlertSeverity.CRITICAL,
        sourceModule: SecurityModuleId.IDENTITY_GUARDIAN,
        resolved: false,
        location: 'London, UK',
        ipAddress: '185.220.101.5',
        device: 'Linux x86_64 / Tor Node',
      },
      {
        id: 'alt-002',
        title: 'Open Wi-Fi Network',
        description: 'Public unencrypted Wi-Fi detected without 802.1X enterprise tunnel.',
        timestamp: '15 min ago',
        severity: AlertSeverity.WARNING,
        sourceModule: SecurityModuleId.NETWORK_SENTINEL,
        resolved: false,
        location: 'Local Wireless Scan',
        ipAddress: '192.168.4.1',
      },
      {
        id: 'alt-003',
        title: 'Backup Completed',
        description: 'Your data is safely backed up to immutable cloud vault storage.',
        timestamp: '1 hour ago',
        severity: AlertSeverity.INFO,
        sourceModule: SecurityModuleId.CLOUD_BACKUP_GUARDIAN,
        resolved: true,
      },
    ];
  }

  getAllAlerts(severity?: string): SecurityAlert[] {
    if (!severity || severity.toUpperCase() === 'ALL') {
      return this.alerts;
    }
    return this.alerts.filter((a) => a.severity.toUpperCase() === severity.toUpperCase());
  }

  resolveAlert(id: string): { success: boolean; alert: SecurityAlert } {
    const alert = this.alerts.find((a) => a.id === id);
    if (!alert) {
      throw new NotFoundException(`Alert ${id} not found.`);
    }
    alert.resolved = true;
    return { success: true, alert };
  }

  createAlert(data: Omit<SecurityAlert, 'id' | 'timestamp' | 'resolved'>): SecurityAlert {
    const newAlert: SecurityAlert = {
      id: `alt-${Date.now()}`,
      timestamp: 'Just now',
      resolved: false,
      ...data,
    };
    this.alerts.unshift(newAlert);
    this.eventsGateway.broadcastAlert(newAlert);
    return newAlert;
  }
}
