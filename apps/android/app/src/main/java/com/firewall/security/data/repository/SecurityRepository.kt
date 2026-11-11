package com.firewall.security.data.repository

import com.firewall.security.data.model.*
import com.firewall.security.data.supabase.SupabaseClient
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class SecurityRepository {

    val supabase = SupabaseClient()
    private val scope = CoroutineScope(Dispatchers.IO)

    private val _userProfile = MutableStateFlow(
        UserProfile(
            id = "usr-yeasin-01",
            fullName = "Yeasin Arafat",
            email = "yeasin@example.com",
            role = "Super User",
            avatarUrl = null,
            securityScore = 98,
            mfaEnabled = true
        )
    )
    val userProfile: StateFlow<UserProfile> = _userProfile.asStateFlow()

    private val _modules = MutableStateFlow<List<SecurityModule>>(emptyList())
    val modules: StateFlow<List<SecurityModule>> = _modules.asStateFlow()

    private val _alerts = MutableStateFlow<List<SecurityAlert>>(emptyList())
    val alerts: StateFlow<List<SecurityAlert>> = _alerts.asStateFlow()

    private val _devices = MutableStateFlow<List<DeviceItem>>(emptyList())
    val devices: StateFlow<List<DeviceItem>> = _devices.asStateFlow()

    private val _vaultItems = MutableStateFlow<List<VaultItem>>(emptyList())
    val vaultItems: StateFlow<List<VaultItem>> = _vaultItems.asStateFlow()

    private val _scanHistory = MutableStateFlow<List<ScanRecord>>(emptyList())
    val scanHistory: StateFlow<List<ScanRecord>> = _scanHistory.asStateFlow()

    init {
        seedInitialData()
    }

    private fun seedInitialData() {
        _modules.value = listOf(
            SecurityModule(
                id = "identity_guardian",
                name = "Identity Guardian",
                tagline = "Digital identity & account protection",
                desc = "Biometric MFA, breach alerts, and digital identity defense.",
                category = ModuleCategory.IDENTITY,
                status = ModuleStatus.SECURE,
                score = 98,
                features = listOf("Secure Login & MFA", "Login Activity Monitor", "Account Security Score", "Breach Alert Service"),
                threatsBlocked = 14,
                lastScanTime = "10 Nov 2026, 09:41 AM"
            ),
            SecurityModule(
                id = "phishing_shield",
                name = "Phishing Shield",
                tagline = "Detect and block phishing threats",
                desc = "Real-time URL heuristic analysis and zero-hour email protection.",
                category = ModuleCategory.NETWORK,
                status = ModuleStatus.ACTIVE,
                score = 96,
                features = listOf("Real-time URL Heuristics", "Malicious Domain Database", "Zero-Hour Threat Defense", "Sandboxing"),
                threatsBlocked = 42,
                lastScanTime = "10 Nov 2026, 11:20 AM"
            ),
            SecurityModule(
                id = "endpoint_guardian",
                name = "Endpoint Guardian",
                tagline = "Hardware trust root & mobile defense",
                desc = "Hardware enclave keystore and mobile integrity verification.",
                category = ModuleCategory.ENDPOINT,
                status = ModuleStatus.SHIELDED,
                score = 100,
                features = listOf("Keystore Enclave Hardware Encryption", "Root & Jailbreak Detection", "App Signature Verification", "Patch Audit"),
                threatsBlocked = 8,
                lastScanTime = "10 Nov 2026, 08:15 AM"
            ),
            SecurityModule(
                id = "network_sentinel",
                name = "Network Sentinel",
                tagline = "Wi-Fi security & packet inspection",
                desc = "Continuous Wi-Fi vulnerability audit, ARP spoofing & MITM shield.",
                category = ModuleCategory.NETWORK,
                status = ModuleStatus.MONITORING,
                score = 94,
                features = listOf("Open Wi-Fi Vulnerability Scan", "ARP Spoofing & MITM Detection", "DNS Hijacking Prevention", "Rogue AP Block"),
                threatsBlocked = 27,
                lastScanTime = "10 Nov 2026, 12:05 PM"
            ),
            SecurityModule(
                id = "vault_guardian",
                name = "Vault Guardian",
                tagline = "Zero-knowledge encrypted security vault",
                desc = "AES-256-GCM zero-knowledge encrypted credential and note vault.",
                category = ModuleCategory.DATA,
                status = ModuleStatus.LOCKED,
                score = 100,
                features = listOf("AES-256-GCM Master Key Encryption", "Zero-Knowledge Derivation", "Biometric Quick-Unlock", "Encrypted Notes"),
                threatsBlocked = 0,
                lastScanTime = "10 Nov 2026, 10:00 AM"
            ),
            SecurityModule(
                id = "ransomware_guardian",
                name = "Ransomware Guardian",
                tagline = "File canary & active entropy defense",
                desc = "Canary honeypot traps and active mass encryption disruption.",
                category = ModuleCategory.ENDPOINT,
                status = ModuleStatus.ARMED,
                score = 99,
                features = listOf("Cryptographic Honeypot Traps", "Mass Modification Blocker", "Behavioral Memory Analysis", "Shadow Copy Guard"),
                threatsBlocked = 5,
                lastScanTime = "10 Nov 2026, 07:30 AM"
            ),
            SecurityModule(
                id = "webshield",
                name = "WebShield",
                tagline = "Secure DNS-over-HTTPS & tracker sinkhole",
                desc = "DNS-over-HTTPS encrypted filtering and ad telemetry sinkhole.",
                category = ModuleCategory.NETWORK,
                status = ModuleStatus.BLOCKING,
                score = 97,
                features = listOf("DoH Encryption", "Ad & Telemetry Sinkhole", "Malicious Script Blocker", "Strict HSTS & CSP"),
                threatsBlocked = 116,
                lastScanTime = "10 Nov 2026, 09:12 AM"
            ),
            SecurityModule(
                id = "digital_forensics",
                name = "Digital Forensics",
                tagline = "Audit trail & chain of custody preservation",
                desc = "Tamper-evident cryptographic ledger and incident timeline replay.",
                category = ModuleCategory.INTELLIGENCE,
                status = ModuleStatus.IMMUTABLE,
                score = 99,
                features = listOf("SHA-256 Hash Chained Logs", "Tamper-Evident Ledger", "Timeline Replay", "Compliance Evidence Export"),
                threatsBlocked = 2,
                lastScanTime = "10 Nov 2026, 06:00 AM"
            ),
            SecurityModule(
                id = "access_guardian",
                name = "Access Guardian",
                tagline = "Zero-Trust network access & geofencing",
                desc = "Context-aware Zero-Trust Network Access and adaptive geofencing.",
                category = ModuleCategory.IDENTITY,
                status = ModuleStatus.SECURE,
                score = 95,
                features = listOf("Context-Aware Conditional Access", "Geofenced IP Authorization", "Session Anomaly Termination", "Device Revocation"),
                threatsBlocked = 19,
                lastScanTime = "10 Nov 2026, 11:45 AM"
            ),
            SecurityModule(
                id = "threat_intelligence",
                name = "Threat Intelligence",
                tagline = "Global IOC feeds & CVE vulnerability sync",
                desc = "STIX/TAXII ingestion of 1.2M+ global indicators and CVE feeds.",
                category = ModuleCategory.INTELLIGENCE,
                status = ModuleStatus.ACTIVE,
                score = 98,
                features = listOf("STIX / TAXII Global Feeds", "CVE Zero-Day Correlation", "Dark Web Leak Surveillance", "Reputation Scoring"),
                threatsBlocked = 340,
                lastScanTime = "10 Nov 2026, 12:30 PM"
            ),
            SecurityModule(
                id = "cloud_backup_guardian",
                name = "Cloud Backup Guardian",
                tagline = "Immutable disaster recovery snapshots",
                desc = "Ransomware-proof immutable cloud snapshots and instant recovery.",
                category = ModuleCategory.DATA,
                status = ModuleStatus.SYNCED,
                score = 100,
                features = listOf("End-to-End Encrypted Cloud Sync", "Snapshot Rollback", "Ransomware-Proof Storage", "Automated Backups"),
                threatsBlocked = 0,
                lastScanTime = "10 Nov 2026, 08:41 AM"
            ),
            SecurityModule(
                id = "cyber_soc",
                name = "Cyber SOC",
                tagline = "Central SIEM security operations command",
                desc = "24/7 central SIEM security command and SOAR automated playbook.",
                category = ModuleCategory.INTELLIGENCE,
                status = ModuleStatus.ACTIVE,
                score = 99,
                features = listOf("24/7 Real-Time Telemetry", "SOAR Automated Playbooks", "Severity Correlation Engine", "Escalation Queue"),
                threatsBlocked = 87,
                lastScanTime = "10 Nov 2026, 12:35 PM"
            )
        )

        _alerts.value = listOf(
            SecurityAlert(
                id = "alt-1",
                title = "Suspicious Login Attempt",
                description = "Unknown device from London, UK",
                timeAgo = "2 min ago",
                severity = AlertSeverity.CRITICAL,
                sourceModule = "Identity Guardian",
                resolved = false,
                location = "London, UK",
                ipAddress = "185.220.101.5",
                deviceName = "Linux x86_64 / Tor Node"
            ),
            SecurityAlert(
                id = "alt-2",
                title = "Open Wi-Fi Network",
                description = "Public Wi-Fi detected",
                timeAgo = "15 min ago",
                severity = AlertSeverity.WARNING,
                sourceModule = "Network Sentinel",
                resolved = false,
                location = "Local Wi-Fi",
                ipAddress = "192.168.4.1"
            ),
            SecurityAlert(
                id = "alt-3",
                title = "Backup Completed",
                description = "Your data is safely backed up",
                timeAgo = "1 hour ago",
                severity = AlertSeverity.INFO,
                sourceModule = "Cloud Backup Guardian",
                resolved = true
            )
        )

        _devices.value = listOf(
            DeviceItem("dev-1", "Google Pixel 9 Pro (This Device)", "Android 15", "192.168.1.145", true, 99, true),
            DeviceItem("dev-2", "MacBook Pro M3 Max", "macOS 15.1", "192.168.1.180", true, 96, false),
            DeviceItem("dev-3", "Workstation Extreme", "Windows 11 Enterprise", "192.168.1.205", true, 94, false),
            DeviceItem("dev-4", "iPad Pro 13", "iPadOS 18.0", "192.168.1.112", true, 98, false),
            DeviceItem("dev-5", "SOC Edge Gateway Node", "Ubuntu 24.04 LTS", "10.0.10.1", true, 95, false)
        )

        _vaultItems.value = listOf(
            VaultItem("v-1", "Enterprise SSH Key", "NOTE", "yeasin-secops", "ssh-ed25519 AAAAC3...GCM", "10 Nov 2026"),
            VaultItem("v-2", "AWS Production Root", "PASSWORD", "root-admin", "sUp3r-S3cur3-Aws#2026", "08 Nov 2026"),
            VaultItem("v-3", "Hardware Token Seed", "NOTE", "Yeasin Arafat", "alpha shield fortress orbit beacon", "01 Nov 2026")
        )

        _scanHistory.value = listOf(
            ScanRecord("scan-1", "Network Sentinel", "Wi-Fi & ARP Scan", 0, "10 Nov 2026, 12:05 PM", 4, true),
            ScanRecord("scan-2", "Phishing Shield", "Deep URL Heuristic", 0, "10 Nov 2026, 11:20 AM", 2, true),
            ScanRecord("scan-3", "Endpoint Guardian", "Titan M2 Keystore Audit", 0, "10 Nov 2026, 08:15 AM", 5, true)
        )
    }

    fun resolveAlert(id: String) {
        _alerts.value = _alerts.value.map {
            if (it.id == id) it.copy(resolved = true) else it
        }
        scope.launch {
            supabase.resolveAlert(id)
        }
    }

    fun syncWithCloud() {
        scope.launch {
            val cloudAlerts = supabase.fetchAlerts()
            if (cloudAlerts.isNotEmpty()) {
                _alerts.value = cloudAlerts
            }
        }
    }

    suspend fun loginWithCloud(email: String, password: String): Boolean {
        val result = supabase.login(email, password)
        return if (result.isSuccess) {
            result.getOrNull()?.let { _userProfile.value = it }
            syncWithCloud()
            supabase.registerDevice()
            true
        } else {
            false
        }
    }

    suspend fun registerWithCloud(email: String, password: String, fullName: String): Boolean {
        val result = supabase.register(email, password, fullName)
        return if (result.isSuccess) {
            result.getOrNull()?.let { _userProfile.value = it }
            syncWithCloud()
            supabase.registerDevice()
            true
        } else {
            false
        }
    }

    fun triggerScanAndReport(moduleName: String) {
        scope.launch {
            supabase.createAlert(
                title = "Mobile Audit: $moduleName",
                description = "Hardware biometric & Wi-Fi scan completed successfully from Android endpoint.",
                severity = "INFO",
                module = moduleName
            )
            syncWithCloud()
        }
    }

    fun revokeDevice(id: String) {
        _devices.value = _devices.value.filter { it.id != id }
    }

    fun addVaultItem(item: VaultItem) {
        _vaultItems.value = listOf(item) + _vaultItems.value
    }
}
