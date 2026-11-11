package com.firewall.security.presentation.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.firewall.security.data.model.DeviceItem
import com.firewall.security.data.model.VaultItem
import com.firewall.security.data.repository.SecurityRepository
import com.firewall.security.presentation.components.CyberButton
import com.firewall.security.presentation.components.CyberCard
import com.firewall.security.theme.*

@Composable
fun AccountProfileScreen(
    repository: SecurityRepository,
    onNavigateSecuritySettings: () -> Unit,
    onNavigateNotificationSettings: () -> Unit,
    onNavigateScanHistory: () -> Unit,
    onNavigateHelp: () -> Unit,
    onLogout: () -> Unit,
    onBack: () -> Unit
) {
    val user by repository.userProfile.collectAsState()
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(CyberDark)
            .padding(16.dp)
            .verticalScroll(scrollState)
    ) {
        // App Bar: Back arrow, "Profile", Settings Gear (Screenshot 8)
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.ArrowBack,
                contentDescription = "Back",
                tint = TextWhite,
                modifier = Modifier
                    .size(24.dp)
                    .clickable { onBack() }
            )
            Text(
                text = "Profile",
                color = TextWhite,
                fontWeight = FontWeight.Bold,
                fontSize = 18.sp
            )
            Icon(
                imageVector = Icons.Default.Settings,
                contentDescription = "Settings",
                tint = TextWhite,
                modifier = Modifier
                    .size(24.dp)
                    .clickable { onNavigateSecuritySettings() }
            )
        }

        Spacer(modifier = Modifier.height(20.dp))

        // User Avatar & Card (Screenshot 8)
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(64.dp)
                    .clip(CircleShape)
                    .background(CyberSurface2)
                    .border(2.dp, CyberBlue, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Person,
                    contentDescription = null,
                    tint = CyberCyan,
                    modifier = Modifier.size(38.dp)
                )
            }

            Spacer(modifier = Modifier.width(14.dp))

            Column {
                Text(
                    text = user.fullName,
                    color = TextWhite,
                    fontWeight = FontWeight.Bold,
                    fontSize = 17.sp
                )
                Text(
                    text = user.email,
                    color = TextMuted,
                    fontSize = 12.sp
                )
                Spacer(modifier = Modifier.height(4.dp))
                Row(
                    modifier = Modifier
                        .background(CyberBlue.copy(alpha = 0.2f), RoundedCornerShape(12.dp))
                        .border(1.dp, CyberBlue.copy(alpha = 0.4f), RoundedCornerShape(12.dp))
                        .padding(horizontal = 8.dp, vertical = 2.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = user.role,
                        color = CyberCyan,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(28.dp))

        // Menu Items (Screenshot 8)
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            ProfileMenuItem(Icons.Default.AccountCircle, "Account Settings") { onNavigateSecuritySettings() }
            ProfileMenuItem(Icons.Default.Shield, "Security Settings") { onNavigateSecuritySettings() }
            ProfileMenuItem(Icons.Default.Notifications, "Notification Preferences") { onNavigateNotificationSettings() }
            ProfileMenuItem(Icons.Default.History, "Activity Log") { onNavigateScanHistory() }
            ProfileMenuItem(Icons.Default.Info, "About Firewall") { onNavigateHelp() }
            ProfileMenuItem(Icons.Default.Help, "Help & Support") { onNavigateHelp() }
        }

        Spacer(modifier = Modifier.height(28.dp))

        // Log Out Button with Red Outline (Screenshot 8)
        OutlinedButton(
            onClick = onLogout,
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp),
            shape = RoundedCornerShape(14.dp),
            border = androidx.compose.foundation.BorderStroke(1.dp, CyberRed),
            colors = ButtonDefaults.outlinedButtonColors(contentColor = CyberRed)
        ) {
            Icon(
                imageVector = Icons.Default.ExitToApp,
                contentDescription = null,
                tint = CyberRed,
                modifier = Modifier.size(18.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
                text = "Log Out",
                color = CyberRed,
                fontWeight = FontWeight.Bold,
                fontSize = 14.sp
            )
        }
    }
}

@Composable
fun ProfileMenuItem(
    icon: ImageVector,
    title: String,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
            .border(1.dp, GlassBorder, RoundedCornerShape(14.dp)),
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = CyberSurface)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(14.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = CyberBlue,
                    modifier = Modifier.size(20.dp)
                )
                Spacer(modifier = Modifier.width(12.dp))
                Text(
                    text = title,
                    color = TextWhite,
                    fontSize = 13.sp,
                    fontWeight = FontWeight.SemiBold
                )
            }
            Icon(
                imageVector = Icons.Default.ChevronRight,
                contentDescription = null,
                tint = TextMuted,
                modifier = Modifier.size(18.dp)
            )
        }
    }
}

@Composable
fun MyDevicesScreen(
    repository: SecurityRepository,
    onBack: () -> Unit
) {
    val devices by repository.devices.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(CyberDark)
            .padding(16.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.ArrowBack,
                contentDescription = "Back",
                tint = TextWhite,
                modifier = Modifier.clickable { onBack() }
            )
            Spacer(modifier = Modifier.width(16.dp))
            Text("My Devices (${devices.size})", color = TextWhite, fontWeight = FontWeight.Bold, fontSize = 18.sp)
        }

        Spacer(modifier = Modifier.height(16.dp))

        devices.forEach { device ->
            CyberCard(modifier = Modifier.padding(bottom = 10.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(device.name, color = TextWhite, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                            if (device.isCurrentDevice) {
                                Spacer(modifier = Modifier.width(6.dp))
                                Text(
                                    "CURRENT",
                                    color = CyberGreen,
                                    fontSize = 9.sp,
                                    fontWeight = FontWeight.Black
                                )
                            }
                        }
                        Text("${device.os} • ${device.ipAddress}", color = TextMuted, fontSize = 11.sp)
                    }

                    if (!device.isCurrentDevice) {
                        Text(
                            "Revoke",
                            color = CyberRed,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier.clickable { repository.revokeDevice(device.id) }
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun SecureVaultScreen(
    repository: SecurityRepository,
    onBack: () -> Unit
) {
    val vaultItems by repository.vaultItems.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(CyberDark)
            .padding(16.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.ArrowBack,
                contentDescription = "Back",
                tint = TextWhite,
                modifier = Modifier.clickable { onBack() }
            )
            Spacer(modifier = Modifier.width(16.dp))
            Text("Secure Vault (AES-256)", color = TextWhite, fontWeight = FontWeight.Bold, fontSize = 18.sp)
        }

        Spacer(modifier = Modifier.height(16.dp))

        vaultItems.forEach { item ->
            CyberCard(modifier = Modifier.padding(bottom = 10.dp)) {
                Text(item.title, color = TextWhite, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                Text("User: ${item.username} • Category: ${item.category}", color = TextMuted, fontSize = 11.sp)
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    "••••••••••••••••••••",
                    color = CyberCyan,
                    fontFamily = androidx.compose.ui.text.font.FontFamily.Monospace,
                    fontSize = 12.sp
                )
            }
        }
    }
}

@Composable
fun BackupCenterScreen(onBack: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(CyberDark)
            .padding(16.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.ArrowBack,
                contentDescription = "Back",
                tint = TextWhite,
                modifier = Modifier.clickable { onBack() }
            )
            Spacer(modifier = Modifier.width(16.dp))
            Text("Backup Center", color = TextWhite, fontWeight = FontWeight.Bold, fontSize = 18.sp)
        }

        Spacer(modifier = Modifier.height(20.dp))

        CyberCard {
            Text("Cloud Snapshot Status", color = CyberCyan, fontWeight = FontWeight.Bold, fontSize = 14.sp)
            Spacer(modifier = Modifier.height(6.dp))
            Text("Latest Backup: 10 Nov 2026, 08:41 AM (1.4 GB)", color = TextWhite, fontSize = 13.sp)
            Text("Encrypted with zero-knowledge AES-256 master key.", color = TextMuted, fontSize = 11.sp)
        }

        Spacer(modifier = Modifier.height(20.dp))

        CyberButton(text = "Trigger Full Snapshot Sync", onClick = {})
    }
}

@Composable
fun ScanHistoryScreen(
    repository: SecurityRepository,
    onBack: () -> Unit
) {
    val history by repository.scanHistory.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(CyberDark)
            .padding(16.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.ArrowBack,
                contentDescription = "Back",
                tint = TextWhite,
                modifier = Modifier.clickable { onBack() }
            )
            Spacer(modifier = Modifier.width(16.dp))
            Text("Scan History & Audit", color = TextWhite, fontWeight = FontWeight.Bold, fontSize = 18.sp)
        }

        Spacer(modifier = Modifier.height(16.dp))

        history.forEach { record ->
            CyberCard(modifier = Modifier.padding(bottom = 10.dp)) {
                Text(record.moduleName, color = TextWhite, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                Text("${record.scanType} • ${record.timestamp}", color = TextMuted, fontSize = 11.sp)
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    if (record.passed) "PASSED (0 Issues Found)" else "WARNINGS DETECTED",
                    color = if (record.passed) CyberGreen else CyberRed,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }
    }
}

@Composable
fun ThreatReportsScreen(onBack: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(CyberDark)
            .padding(16.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.ArrowBack,
                contentDescription = "Back",
                tint = TextWhite,
                modifier = Modifier.clickable { onBack() }
            )
            Spacer(modifier = Modifier.width(16.dp))
            Text("Threat Intelligence Reports", color = TextWhite, fontWeight = FontWeight.Bold, fontSize = 18.sp)
        }

        Spacer(modifier = Modifier.height(16.dp))

        CyberCard {
            Text("CISA Zero-Day Ingestion Active", color = CyberGreen, fontWeight = FontWeight.Bold, fontSize = 13.sp)
            Text("Over 1.2M indicators synchronized in last 24h.", color = TextMuted, fontSize = 11.sp)
        }
    }
}

@Composable
fun SecuritySettingsScreen(onBack: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(CyberDark)
            .padding(16.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.ArrowBack,
                contentDescription = "Back",
                tint = TextWhite,
                modifier = Modifier.clickable { onBack() }
            )
            Spacer(modifier = Modifier.width(16.dp))
            Text("Security & Keystore Settings", color = TextWhite, fontWeight = FontWeight.Bold, fontSize = 18.sp)
        }

        Spacer(modifier = Modifier.height(16.dp))

        CyberCard {
            Text("Android Keystore Titan M2 Enclave: ENFORCED", color = CyberGreen, fontSize = 12.sp, fontWeight = FontWeight.Bold)
            Spacer(modifier = Modifier.height(8.dp))
            Text("BiometricPrompt Tier 3 Authentication: ACTIVE", color = CyberCyan, fontSize = 12.sp, fontWeight = FontWeight.Bold)
            Spacer(modifier = Modifier.height(8.dp))
            Text("DoH Encrypted DNS Resolver: CLOUDFLARE 1.1.1.2", color = TextWhite, fontSize = 12.sp)
        }
    }
}

@Composable
fun NotificationSettingsScreen(onBack: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(CyberDark)
            .padding(16.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.ArrowBack,
                contentDescription = "Back",
                tint = TextWhite,
                modifier = Modifier.clickable { onBack() }
            )
            Spacer(modifier = Modifier.width(16.dp))
            Text("Notification Preferences", color = TextWhite, fontWeight = FontWeight.Bold, fontSize = 18.sp)
        }

        Spacer(modifier = Modifier.height(16.dp))

        CyberCard {
            Text("Push Alerts: Critical Threats (Active)", color = TextWhite, fontSize = 13.sp)
            Spacer(modifier = Modifier.height(8.dp))
            Text("Push Alerts: Wi-Fi Warnings (Active)", color = TextWhite, fontSize = 13.sp)
            Spacer(modifier = Modifier.height(8.dp))
            Text("Push Alerts: Backup Status (Active)", color = TextWhite, fontSize = 13.sp)
        }
    }
}

@Composable
fun HelpSupportScreen(onBack: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(CyberDark)
            .padding(16.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.ArrowBack,
                contentDescription = "Back",
                tint = TextWhite,
                modifier = Modifier.clickable { onBack() }
            )
            Spacer(modifier = Modifier.width(16.dp))
            Text("Help & Support", color = TextWhite, fontWeight = FontWeight.Bold, fontSize = 18.sp)
        }

        Spacer(modifier = Modifier.height(16.dp))

        CyberCard {
            Text("24/7 SOC Emergency Contact", color = CyberCyan, fontWeight = FontWeight.Bold, fontSize = 14.sp)
            Spacer(modifier = Modifier.height(4.dp))
            Text("Email: soc-team@firewall.cyber", color = TextWhite, fontSize = 12.sp)
            Text("Hotline: +1 (800) 555-CYBER", color = TextWhite, fontSize = 12.sp)
            Spacer(modifier = Modifier.height(12.dp))
            Text("Architecture Specification: SIS Cyber Fortress v2026", color = TextMuted, fontSize = 11.sp)
        }
    }
}
