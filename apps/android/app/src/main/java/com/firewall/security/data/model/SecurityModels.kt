package com.firewall.security.data.model

data class UserProfile(
    val id: String,
    val fullName: String,
    val email: String,
    val role: String, // "Super User"
    val avatarUrl: String?,
    val securityScore: Int,
    val mfaEnabled: Boolean
)

enum class ModuleCategory {
    IDENTITY, NETWORK, ENDPOINT, DATA, INTELLIGENCE
}

enum class ModuleStatus {
    SECURE, WARNING, CRITICAL, SCANNING, ACTIVE, MONITORING, SHIELDED, LOCKED, ARMED, BLOCKING, IMMUTABLE, SYNCED
}

data class SecurityModule(
    val id: String,
    val name: String,
    val tagline: String,
    val desc: String,
    val category: ModuleCategory,
    val status: ModuleStatus,
    val score: Int,
    val features: List<String>,
    val threatsBlocked: Int,
    val lastScanTime: String
)

enum class AlertSeverity {
    CRITICAL, WARNING, INFO
}

data class SecurityAlert(
    val id: String,
    val title: String,
    val description: String,
    val timeAgo: String,
    val severity: AlertSeverity,
    val sourceModule: String,
    val resolved: Boolean,
    val location: String? = null,
    val ipAddress: String? = null,
    val deviceName: String? = null
)

data class DeviceItem(
    val id: String,
    val name: String,
    val os: String,
    val ipAddress: String,
    val isOnline: Boolean,
    val trustScore: Int,
    val isCurrentDevice: Boolean
)

data class VaultItem(
    val id: String,
    val title: String,
    val category: String, // "PASSWORD", "NOTE", "IDENTITY"
    val username: String,
    val encryptedSecret: String,
    val lastModified: String
)

data class ScanRecord(
    val id: String,
    val moduleName: String,
    val scanType: String,
    val issuesFound: Int,
    val timestamp: String,
    val durationSeconds: Int,
    val passed: Boolean
)

data class ThreatReport(
    val id: String,
    val threatName: String,
    val category: String,
    val severity: String,
    val mitigationAction: String,
    val timestamp: String
)
