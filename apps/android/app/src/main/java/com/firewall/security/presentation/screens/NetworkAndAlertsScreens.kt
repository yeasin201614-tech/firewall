package com.firewall.security.presentation.screens

import androidx.compose.animation.core.*
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
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.firewall.security.data.model.AlertSeverity
import com.firewall.security.data.model.SecurityAlert
import com.firewall.security.data.repository.SecurityRepository
import com.firewall.security.presentation.components.CyberButton
import com.firewall.security.presentation.components.CyberCard
import com.firewall.security.theme.*

@Composable
fun NetworkSecurityScreen(
    onBack: () -> Unit
) {
    var progress by remember { mutableStateOf(68) }

    // Pulsing animation for concentric radar rings
    val infiniteTransition = rememberInfiniteTransition(label = "radar")
    val pulseScale by infiniteTransition.animateFloat(
        initialValue = 0.85f,
        targetValue = 1.15f,
        animationSpec = infiniteRepeatable(
            animation = tween(1200, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "pulse"
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(CyberDark)
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // App Bar: Back Arrow, "Network Sentinel"
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp),
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
            Spacer(modifier = Modifier.width(16.dp))
            Text(
                text = "Network Sentinel",
                color = TextWhite,
                fontWeight = FontWeight.Bold,
                fontSize = 18.sp
            )
        }

        Spacer(modifier = Modifier.height(32.dp))

        // Glowing Concentric Wi-Fi Radar Graphic (Screenshot 6)
        Box(
            modifier = Modifier
                .size(160.dp)
                .scale(pulseScale)
                .border(2.dp, GlassBorderBright, CircleShape)
                .background(Color(0xFF041C48), CircleShape),
            contentAlignment = Alignment.Center
        ) {
            Box(
                modifier = Modifier
                    .size(110.dp)
                    .border(1.dp, CyberBlue, CircleShape)
                    .background(Color(0xFF082B6E), CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Wifi,
                    contentDescription = null,
                    tint = CyberCyan,
                    modifier = Modifier.size(54.dp)
                )
            }
        }

        Spacer(modifier = Modifier.height(28.dp))

        Text(
            text = "Scanning Network...",
            color = TextWhite,
            fontWeight = FontWeight.Black,
            fontSize = 20.sp
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = "Checking for open Wi-Fi,\nsecurity risks and vulnerabilities...",
            color = TextMuted,
            fontSize = 12.sp,
            textAlign = androidx.compose.ui.text.style.TextAlign.Center,
            lineHeight = 16.sp
        )

        Spacer(modifier = Modifier.height(28.dp))

        // Progress Bar: 68% (Exact match to screenshot 6)
        Column(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp)) {
            LinearProgressIndicator(
                progress = progress / 100f,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(6.dp)
                    .clip(RoundedCornerShape(3.dp)),
                color = CyberCyan,
                trackColor = CyberSurface2
            )
            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = "$progress%",
                color = CyberCyan,
                fontSize = 13.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.align(Alignment.CenterHorizontally)
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Scan Details Card (Screenshot 6)
        CyberCard {
            Text(
                text = "Scan Details",
                color = TextWhite,
                fontWeight = FontWeight.Bold,
                fontSize = 13.sp
            )
            Spacer(modifier = Modifier.height(12.dp))

            // 1. Network Information (green check)
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Default.CheckCircle,
                    contentDescription = null,
                    tint = CyberGreen,
                    modifier = Modifier.size(16.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "Network Information",
                    color = TextWhite,
                    fontSize = 12.sp
                )
            }

            Spacer(modifier = Modifier.height(8.dp))

            // 2. Security Check (green check)
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Default.CheckCircle,
                    contentDescription = null,
                    tint = CyberGreen,
                    modifier = Modifier.size(16.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "Security Check",
                    color = TextWhite,
                    fontSize = 12.sp
                )
            }

            Spacer(modifier = Modifier.height(8.dp))

            // 3. Risk Analysis... (spinner/loading)
            Row(verticalAlignment = Alignment.CenterVertically) {
                CircularProgressIndicator(
                    color = CyberCyan,
                    strokeWidth = 2.dp,
                    modifier = Modifier.size(16.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "Risk Analysis...",
                    color = CyberCyan,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold
                )
            }
        }
    }
}

@Composable
fun SecurityAlertsScreen(
    repository: SecurityRepository,
    onBack: () -> Unit
) {
    val alerts by repository.alerts.collectAsState()
    var selectedFilter by remember { mutableStateOf("ALL") }

    LaunchedEffect(Unit) {
        repository.syncWithCloud()
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(CyberDark)
            .padding(16.dp)
    ) {
        // App Bar: Bell icon, "Security Alerts", Badge '3' (Screenshot 7)
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.Notifications,
                contentDescription = null,
                tint = CyberOrange,
                modifier = Modifier.size(22.dp)
            )
            Spacer(modifier = Modifier.width(10.dp))
            Text(
                text = "Security Alerts",
                color = TextWhite,
                fontWeight = FontWeight.Bold,
                fontSize = 18.sp
            )
            Spacer(modifier = Modifier.weight(1f))
            Box(
                modifier = Modifier
                    .size(20.dp)
                    .background(CyberRed, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Text("3", color = TextWhite, fontSize = 11.sp, fontWeight = FontWeight.Bold)
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Filter Tabs: All (3), Critical, Warning, Info (Screenshot 7)
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            FilterTabItem("All (3)", selectedFilter == "ALL", Modifier.weight(1f)) { selectedFilter = "ALL" }
            FilterTabItem("Critical", selectedFilter == "CRITICAL", Modifier.weight(1f)) { selectedFilter = "CRITICAL" }
            FilterTabItem("Warning", selectedFilter == "WARNING", Modifier.weight(1f)) { selectedFilter = "WARNING" }
            FilterTabItem("Info", selectedFilter == "INFO", Modifier.weight(1f)) { selectedFilter = "INFO" }
        }

        Spacer(modifier = Modifier.height(16.dp))

        val filteredAlerts = alerts.filter {
            when (selectedFilter) {
                "CRITICAL" -> it.severity == AlertSeverity.CRITICAL
                "WARNING" -> it.severity == AlertSeverity.WARNING
                "INFO" -> it.severity == AlertSeverity.INFO
                else -> true
            }
        }

        val scrollState = rememberScrollState()
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(scrollState),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            filteredAlerts.forEach { alert ->
                AlertItemCard(alert)
            }
        }
    }
}

@Composable
fun FilterTabItem(
    label: String,
    isSelected: Boolean,
    modifier: Modifier = Modifier,
    onClick: () -> Unit
) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(12.dp))
            .background(if (isSelected) CyberBlue else CyberSurface)
            .clickable { onClick() }
            .padding(vertical = 8.dp),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = label,
            color = if (isSelected) TextWhite else TextMuted,
            fontSize = 11.sp,
            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium
        )
    }
}

@Composable
fun AlertItemCard(alert: SecurityAlert) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .border(
                1.dp,
                when (alert.severity) {
                    AlertSeverity.CRITICAL -> Color(0x60FF4057)
                    AlertSeverity.WARNING -> Color(0x60FFA000)
                    AlertSeverity.INFO -> Color(0x60087BFF)
                },
                RoundedCornerShape(16.dp)
            ),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = CyberSurface)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(14.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(36.dp)
                    .background(
                        when (alert.severity) {
                            AlertSeverity.CRITICAL -> CyberRed.copy(alpha = 0.2f)
                            AlertSeverity.WARNING -> CyberOrange.copy(alpha = 0.2f)
                            AlertSeverity.INFO -> CyberBlue.copy(alpha = 0.2f)
                        },
                        CircleShape
                    ),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = when (alert.severity) {
                        AlertSeverity.CRITICAL -> Icons.Default.Warning
                        AlertSeverity.WARNING -> Icons.Default.WarningAmber
                        AlertSeverity.INFO -> Icons.Default.Info
                    },
                    contentDescription = null,
                    tint = when (alert.severity) {
                        AlertSeverity.CRITICAL -> CyberRed
                        AlertSeverity.WARNING -> CyberOrange
                        AlertSeverity.INFO -> CyberBlue
                    },
                    modifier = Modifier.size(18.dp)
                )
            }

            Spacer(modifier = Modifier.width(12.dp))

            Column(modifier = Modifier.weight(1f)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = alert.title,
                        color = TextWhite,
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp
                    )
                    Text(
                        text = alert.timeAgo,
                        color = TextMuted,
                        fontSize = 10.sp
                    )
                }
                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = alert.description,
                    color = TextMuted,
                    fontSize = 11.sp
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
