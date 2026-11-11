import { Injectable } from '@nestjs/common';
import { SystemOverview } from '@firewall/shared-types';
import { ModulesService } from '../modules/modules.service';
import { AlertsService } from '../alerts/alerts.service';
import { DevicesService } from '../devices/devices.service';

@Injectable()
export class OverviewService {
  constructor(
    private modulesService: ModulesService,
    private alertsService: AlertsService,
    private devicesService: DevicesService,
  ) {}

  getOverview(): SystemOverview {
    const modules = this.modulesService.getAllModules();
    const alerts = this.alertsService.getAllAlerts();
    const devices = this.devicesService.getAllDevices();

    return {
      securityScore: 98,
      statusText: 'All Systems Secure',
      activeModulesCount: modules.length,
      totalModulesCount: 12,
      pendingAlertsCount: alerts.filter((a) => !a.resolved).length,
      registeredDevicesCount: devices.length,
      uptimePercentage: 99.9,
      backupStatus: {
        lastBackupTime: '10 Nov 2026, 08:41 AM',
        sizeBytes: 1468006400, // 1.4 GB
        status: 'SYNCED',
        location: 'Firewall Encrypted Cloud Vault',
        version: 'v4.1.2-sec',
      },
      recentAlerts: alerts.slice(0, 3),
    };
  }
}
