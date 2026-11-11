import { Injectable } from '@nestjs/common';
import { DeviceInfo } from '@firewall/shared-types';

@Injectable()
export class DevicesService {
  private devices: DeviceInfo[] = [
    {
      id: 'dev-001',
      name: 'Google Pixel 9 Pro (This Device)',
      type: 'MOBILE',
      os: 'Android 15 (Security Patch Nov 2026)',
      ipAddress: '192.168.1.145',
      lastActive: 'Active now',
      status: 'ONLINE',
      trustScore: 99,
    },
    {
      id: 'dev-002',
      name: 'MacBook Pro M3 Max',
      type: 'DESKTOP',
      os: 'macOS Sequoia 15.1',
      ipAddress: '192.168.1.180',
      lastActive: '5 min ago',
      status: 'ONLINE',
      trustScore: 96,
    },
    {
      id: 'dev-003',
      name: 'Workstation Extreme',
      type: 'DESKTOP',
      os: 'Windows 11 Enterprise 24H2',
      ipAddress: '192.168.1.205',
      lastActive: '23 min ago',
      status: 'ONLINE',
      trustScore: 94,
    },
    {
      id: 'dev-004',
      name: 'Executive iPad Pro 13',
      type: 'TABLET',
      os: 'iPadOS 18.0.2',
      ipAddress: '192.168.1.112',
      lastActive: '2 hours ago',
      status: 'ONLINE',
      trustScore: 98,
    },
    {
      id: 'dev-005',
      name: 'SOC Edge Gateway Node',
      type: 'SERVER',
      os: 'Ubuntu 24.04 LTS Hardened',
      ipAddress: '10.0.10.1',
      lastActive: 'Active now',
      status: 'ONLINE',
      trustScore: 95,
    },
  ];

  getAllDevices(): DeviceInfo[] {
    return this.devices;
  }

  getDevice(id: string): DeviceInfo | undefined {
    return this.devices.find((d) => d.id === id);
  }

  revokeDevice(id: string): { success: boolean; message: string } {
    this.devices = this.devices.filter((d) => d.id !== id);
    return { success: true, message: `Device ${id} access revoked.` };
  }
}
