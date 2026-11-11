/**
 * FIREWALL — Enterprise Cybersecurity Ecosystem
 * Core Type Definitions & API Contracts
 */
export declare enum UserRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    SOC_ANALYST = "SOC_ANALYST",
    SUPER_USER = "SUPER_USER",
    USER = "USER"
}
export interface User {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
    avatarUrl?: string;
    isMfaEnabled: boolean;
    securityScore: number;
    createdAt: string;
    updatedAt: string;
}
export declare enum SecurityModuleId {
    IDENTITY_GUARDIAN = "identity_guardian",
    PHISHING_SHIELD = "phishing_shield",
    ENDPOINT_GUARDIAN = "endpoint_guardian",
    NETWORK_SENTINEL = "network_sentinel",
    VAULT_GUARDIAN = "vault_guardian",
    RANSOMWARE_GUARDIAN = "ransomware_guardian",
    WEBSHIELD = "webshield",
    DIGITAL_FORENSICS = "digital_forensics",
    ACCESS_GUARDIAN = "access_guardian",
    THREAT_INTELLIGENCE = "threat_intelligence",
    CLOUD_BACKUP_GUARDIAN = "cloud_backup_guardian",
    CYBER_SOC = "cyber_soc"
}
export type ModuleStatus = 'SECURE' | 'WARNING' | 'CRITICAL' | 'SCANNING' | 'DISABLED';
export interface SecurityModule {
    id: SecurityModuleId;
    name: string;
    tagline: string;
    category: 'IDENTITY' | 'NETWORK' | 'ENDPOINT' | 'DATA' | 'INTELLIGENCE';
    status: ModuleStatus;
    score: number;
    features: string[];
    lastScanTime: string;
    threatsBlocked: number;
    summary: string;
}
export declare enum AlertSeverity {
    CRITICAL = "CRITICAL",
    WARNING = "WARNING",
    INFO = "INFO"
}
export interface SecurityAlert {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    severity: AlertSeverity;
    sourceModule: SecurityModuleId;
    resolved: boolean;
    location?: string;
    ipAddress?: string;
    device?: string;
}
export interface DeviceInfo {
    id: string;
    name: string;
    type: 'MOBILE' | 'DESKTOP' | 'TABLET' | 'SERVER';
    os: string;
    ipAddress: string;
    lastActive: string;
    status: 'ONLINE' | 'OFFLINE' | 'SUSPICIOUS';
    trustScore: number;
}
export interface NetworkScanState {
    isScanning: boolean;
    progress: number;
    currentStep: string;
    ssid?: string;
    bssid?: string;
    encryption?: string;
    ipAddress?: string;
    gateway?: string;
    openPorts: number[];
    vulnerabilities: string[];
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}
export interface PhishingCheckResult {
    url: string;
    isSafe: boolean;
    threatCategory?: 'MALWARE' | 'PHISHING' | 'SUSPICIOUS_REDIRECT' | 'CLEAN';
    domainAgeDays?: number;
    sslValid: boolean;
    reputationScore: number;
    lastChecked: string;
    details: string;
}
export interface VaultRecord {
    id: string;
    title: string;
    category: 'PASSWORD' | 'NOTE' | 'IDENTITY' | 'CARD';
    username?: string;
    encryptedBlob: string;
    iv: string;
    updatedAt: string;
}
export interface BackupStatus {
    lastBackupTime: string;
    sizeBytes: number;
    status: 'SYNCED' | 'IN_PROGRESS' | 'FAILED';
    location: string;
    version: string;
}
export interface SystemOverview {
    securityScore: number;
    statusText: string;
    activeModulesCount: number;
    totalModulesCount: number;
    pendingAlertsCount: number;
    registeredDevicesCount: number;
    uptimePercentage: number;
    backupStatus: BackupStatus;
    recentAlerts: SecurityAlert[];
}
//# sourceMappingURL=index.d.ts.map