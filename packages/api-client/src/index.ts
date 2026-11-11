import {
  User,
  SecurityModule,
  SecurityModuleId,
  SecurityAlert,
  DeviceInfo,
  PhishingCheckResult,
  VaultRecord,
  SystemOverview,
  NetworkScanState,
} from '@firewall/shared-types';

export interface ApiClientConfig {
  baseUrl: string;
  getToken?: () => string | null;
  onUnauthorized?: () => void;
}

export class FirewallApiClient {
  private baseUrl: string;
  private getToken?: () => string | null;
  private onUnauthorized?: () => void;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.getToken = config.getToken;
    this.onUnauthorized = config.onUnauthorized;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = this.getToken ? this.getToken() : null;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401 && this.onUnauthorized) {
      this.onUnauthorized();
    }

    if (!response.ok) {
      const errBody = await response.json().catch(() => ({}));
      throw new Error(errBody.message || `Request failed with status ${response.status}`);
    }

    return response.json();
  }

  // --- Auth ---
  async login(email: string, passwordHash: string): Promise<{ token: string; user: User; requiresMfa?: boolean }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: passwordHash }),
    });
  }

  async verifyMfa(code: string, tempToken: string): Promise<{ token: string; user: User }> {
    return this.request('/auth/mfa/verify', {
      method: 'POST',
      body: JSON.stringify({ code, tempToken }),
    });
  }

  async register(data: { email: string; fullName: string; passwordHash: string }): Promise<{ user: User }> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // --- Overview ---
  async getSystemOverview(): Promise<SystemOverview> {
    return this.request('/overview');
  }

  // --- Security Modules ---
  async getModules(): Promise<SecurityModule[]> {
    return this.request('/modules');
  }

  async getModule(id: SecurityModuleId): Promise<SecurityModule> {
    return this.request(`/modules/${id}`);
  }

  async triggerModuleScan(id: SecurityModuleId): Promise<{ scanId: string; status: string }> {
    return this.request(`/modules/${id}/scan`, { method: 'POST' });
  }

  // --- Phishing Shield ---
  async checkUrl(url: string): Promise<PhishingCheckResult> {
    return this.request('/modules/phishing_shield/check-url', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
  }

  // --- Network Sentinel ---
  async scanNetwork(): Promise<NetworkScanState> {
    return this.request('/modules/network_sentinel/scan', { method: 'POST' });
  }

  // --- Alerts ---
  async getAlerts(filter?: string): Promise<SecurityAlert[]> {
    const query = filter ? `?severity=${filter}` : '';
    return this.request(`/alerts${query}`);
  }

  async resolveAlert(alertId: string): Promise<{ success: boolean }> {
    return this.request(`/alerts/${alertId}/resolve`, { method: 'POST' });
  }

  // --- Devices ---
  async getDevices(): Promise<DeviceInfo[]> {
    return this.request('/devices');
  }

  // --- Vault ---
  async getVaultItems(): Promise<VaultRecord[]> {
    return this.request('/vault');
  }

  async addVaultItem(item: Omit<VaultRecord, 'id' | 'updatedAt'>): Promise<VaultRecord> {
    return this.request('/vault', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  }
}

export * from './supabase';

