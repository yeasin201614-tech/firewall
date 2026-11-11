package com.firewall.security.presentation.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
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
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.firewall.security.R
import com.firewall.security.data.model.SecurityModule
import com.firewall.security.data.repository.SecurityRepository
import com.firewall.security.presentation.components.CyberButton
import com.firewall.security.presentation.components.CyberCard
import com.firewall.security.theme.*

@Composable
fun HomeDashboardScreen(
    repository: SecurityRepository,
    onNavigateModule: (String) -> Unit,
    onNavigateAllModules: () -> Unit,
    onNavigateAlerts: () -> Unit,
    onNavigateDevices: () -> Unit,
    onNavigateScan: () -> Unit
) {
    val user by repository.userProfile.collectAsState()
    val modules by repository.modules.collectAsState()
    val alerts by repository.alerts.collectAsState()
    val devices by repository.devices.collectAsState()

    val scrollState = rememberScrollState()

    LaunchedEffect(Unit) {
        repository.syncWithCloud()
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(CyberDark)
            .verticalScroll(scrollState)
            .padding(16.dp)
    ) {
        // Top Header: Hamburger, Firewall Brand, Notification Bell with Badge 3
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.Menu,
                contentDescription = "Menu",
                tint = TextWhite,
                modifier = Modifier.size(26.dp)
            )

            // Firewall Brand Logo
            Row(verticalAlignment = Alignment.CenterVertically) {
                Image(
                    painter = painterResource(id = R.drawable.firewall_logo),
                    contentDescription = null,
                    modifier = Modifier.size(32.dp)
                )
                Spacer(modifier = Modifier.width(6.dp))
                Text(
                    text = "Fire",
                    fontWeight = FontWeight.Black,
                    fontSize = 20.sp,
                    color = TextWhite
                )
                Text(
                    text = "wall",
                    fontWeight = FontWeight.Black,
                    fontSize = 20.sp,
                    color = CyberOrange
                )
            }

            // Notification Bell with badge 3
            BadgedBox(
                badge = {
                    Badge(
                        containerColor = CyberRed,
                        contentColor = TextWhite
                    ) {
                        Text("3", fontSize = 9.sp)
                    }
                },
                modifier = Modifier.clickable { onNavigateAlerts() }
            ) {
                Icon(
                    imageVector = Icons.Default.Notifications,
                    contentDescription = "Alerts",
                    tint = TextWhite,
                    modifier = Modifier.size(24.dp)
                )
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Profile Card (Yeasin Arafat - Super User)
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(54.dp)
                    .clip(CircleShape)
                    .background(CyberSurface2)
                    .border(2.dp, CyberBlue, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Person,
                    contentDescription = null,
                    tint = CyberCyan,
                    modifier = Modifier.size(32.dp)
                )
            }

            Spacer(modifier = Modifier.width(14.dp))

            Column {
                Text(
                    text = "Welcome Back!",
                    color = TextMuted,
                    fontSize = 12.sp
                )
                Text(
                    text = user.fullName,
                    color = TextWhite,
                    fontWeight = FontWeight.Bold,
                    fontSize = 18.sp
                )
                Spacer(modifier = Modifier.height(2.dp))
                Row(
                    modifier = Modifier
                        .background(Color(0xFF042617), RoundedCornerShape(12.dp))
                        .border(1.dp, Color(0x6000D68F), RoundedCornerShape(12.dp))
                        .padding(horizontal = 8.dp, vertical = 2.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = user.role,
                        color = CyberGreen,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Icon(
                        imageVector = Icons.Default.CheckCircle,
                        contentDescription = null,
                        tint = CyberGreen,
                        modifier = Modifier.size(11.dp)
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // System Status Card: Green Banner "All Systems Secure ->"
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .clickable { onNavigateScan() }
                .border(1.dp, Color(0x6000D68F), RoundedCornerShape(16.dp)),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF073822))
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(14.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(38.dp)
                            .background(Color(0xFF0B4F32), RoundedCornerShape(10.dp)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Shield,
                            contentDescription = null,
                            tint = CyberGreen,
                            modifier = Modifier.size(20.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(12.dp))
                    Column {
                        Text(
                            text = "System Status",
                            color = Color(0xFF86EFAC),
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Medium
                        )
                        Text(
                            text = "All Systems Secure",
                            color = TextWhite,
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Black
                        )
                    }
                }

                Icon(
                    imageVector = Icons.Default.ArrowForward,
                    contentDescription = null,
                    tint = Color(0xFF86EFAC),
                    modifier = Modifier.size(20.dp)
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // 4 Core Metrics Grid (Exact match from screenshot: 12 Modules, 3 Alerts, 5 Devices, 99.9% Uptime)
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            MetricPill(
                title = "Modules",
                value = "${modules.size}",
                icon = Icons.Default.Shield,
                color = CyberBlue,
                modifier = Modifier.weight(1f)
            ) { onNavigateAllModules() }

            MetricPill(
                title = "Alerts",
                value = "${alerts.filter { !it.resolved }.size}",
                icon = Icons.Default.Warning,
                color = CyberRed,
                modifier = Modifier.weight(1f)
            ) { onNavigateAlerts() }

            MetricPill(
                title = "Devices",
                value = "${devices.size}",
                icon = Icons.Default.Laptop,
                color = CyberCyan,
                modifier = Modifier.weight(1f)
            ) { onNavigateDevices() }

            MetricPill(
                title = "Uptime",
                value = "99.9%",
                icon = Icons.Default.Timer,
                color = CyberOrangeGlow,
                modifier = Modifier.weight(1f)
            ) {}
        }

        Spacer(modifier = Modifier.height(22.dp))

        // Security Modules Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Security Modules",
                color = TextWhite,
                fontSize = 17.sp,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "See All",
                color = CyberCyan,
                fontSize = 12.sp,
                fontWeight = FontWeight.SemiBold,
                modifier = Modifier.clickable { onNavigateAllModules() }
            )
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Grid of Top 6 Modules (Identity Guardian, Phishing Shield, Endpoint Guardian, Network Sentinel, Vault Guardian, Ransomware Guardian)
        val top6 = modules.take(6)
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                ModuleCardCompact(top6[0], CyberBlue, Modifier.weight(1f)) { onNavigateModule(top6[0].id) }
                ModuleCardCompact(top6[1], Color(0xFFA855F7), Modifier.weight(1f)) { onNavigateModule(top6[1].id) }
                ModuleCardCompact(top6[2], CyberGreen, Modifier.weight(1f)) { onNavigateModule(top6[2].id) }
            }
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                ModuleCardCompact(top6[3], CyberCyan, Modifier.weight(1f)) { onNavigateModule(top6[3].id) }
                ModuleCardCompact(top6[4], CyberOrange, Modifier.weight(1f)) { onNavigateModule(top6[4].id) }
                ModuleCardCompact(top6[5], CyberRed, Modifier.weight(1f)) { onNavigateModule(top6[5].id) }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Rapid Security Sweep Button
        CyberButton(
            text = "⚡  Trigger Rapid Security Sweep",
            onClick = onNavigateScan
        )

        Spacer(modifier = Modifier.height(24.dp))
    }
}

@Composable
fun MetricPill(
    title: String,
    value: String,
    icon: ImageVector,
    color: Color,
    modifier: Modifier = Modifier,
    onClick: () -> Unit
) {
    Card(
        modifier = modifier
            .clickable { onClick() }
            .border(1.dp, GlassBorder, RoundedCornerShape(14.dp)),
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = CyberSurface)
    ) {
        Column(
            modifier = Modifier.padding(10.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = color,
                modifier = Modifier.size(18.dp)
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = value,
                color = TextWhite,
                fontWeight = FontWeight.Black,
                fontSize = 14.sp
            )
            Text(
                text = title,
                color = TextMuted,
                fontSize = 9.sp
            )
        }
    }
}

@Composable
fun ModuleCardCompact(
    module: SecurityModule,
    accentColor: Color,
    modifier: Modifier = Modifier,
    onClick: () -> Unit
) {
    Card(
        modifier = modifier
            .height(105.dp)
            .clickable { onClick() }
            .border(1.dp, GlassBorder, RoundedCornerShape(16.dp)),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = CyberSurface)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(10.dp),
            verticalArrangement = Arrangement.SpaceBetween,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Box(
                modifier = Modifier
                    .size(38.dp)
                    .background(accentColor.copy(alpha = 0.2f), RoundedCornerShape(10.dp)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = when (module.id) {
                        "identity_guardian" -> Icons.Default.Fingerprint
                        "phishing_shield" -> Icons.Default.Email
                        "endpoint_guardian" -> Icons.Default.Smartphone
                        "network_sentinel" -> Icons.Default.Wifi
                        "vault_guardian" -> Icons.Default.Lock
                        else -> Icons.Default.Shield
                    },
                    contentDescription = null,
                    tint = accentColor,
                    modifier = Modifier.size(22.dp)
                )
            }

            Text(
                text = module.name,
                color = TextWhite,
                fontWeight = FontWeight.Bold,
                fontSize = 10.sp,
                textAlign = androidx.compose.ui.text.style.TextAlign.Center,
                lineHeight = 12.sp,
                maxLines = 2
            )
        }
    }
}
