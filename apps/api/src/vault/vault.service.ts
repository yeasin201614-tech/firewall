import { Injectable } from '@nestjs/common';
import { VaultRecord } from '@firewall/shared-types';

@Injectable()
export class VaultService {
  private vaultItems: VaultRecord[] = [
    {
      id: 'vlt-001',
      title: 'Enterprise GitHub SSH Key',
      category: 'NOTE',
      username: 'yeasin-secops',
      encryptedBlob: 'U2FsdGVkX19q76+2kP8kL4f92...GCM',
      iv: 'a381f9b0c2',
      updatedAt: '10 Nov 2026, 09:15 AM',
    },
    {
      id: 'vlt-002',
      title: 'Production AWS Root Credentials',
      category: 'PASSWORD',
      username: 'root-admin',
      encryptedBlob: 'U2FsdGVkX1+z99A1Kq09L3k1...GCM',
      iv: 'c1902eb34d',
      updatedAt: '08 Nov 2026, 04:30 PM',
    },
    {
      id: 'vlt-003',
      title: 'Corporate Hardware Security Token PIN',
      category: 'IDENTITY',
      username: 'Yeasin Arafat',
      encryptedBlob: 'U2FsdGVkX1+xLk2899A...GCM',
      iv: '992a71fe89',
      updatedAt: '01 Nov 2026, 10:00 AM',
    },
  ];

  getVaultItems(): VaultRecord[] {
    return this.vaultItems;
  }

  addVaultItem(item: Omit<VaultRecord, 'id' | 'updatedAt'>): VaultRecord {
    const newItem: VaultRecord = {
      id: `vlt-${Date.now()}`,
      updatedAt: new Date().toLocaleString('en-GB'),
      ...item,
    };
    this.vaultItems.unshift(newItem);
    return newItem;
  }

  deleteVaultItem(id: string): { success: boolean } {
    this.vaultItems = this.vaultItems.filter((i) => i.id !== id);
    return { success: true };
  }
}
