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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.firewall.security.data.model.SecurityModule
import com.firewall.security.data.repository.SecurityRepository
import com.firewall.security.presentation.components.CyberButton
import com.firewall.security.presentation.components.CyberCard
import com.firewall.security.presentation.components.StatusPill
import com.firewall.security.theme.*

@Composable
fun AllModulesScreen(
    repository: SecurityRepository,
    onNavigateModule: (String) -> Unit,
    onBack: () -> Unit
) {
    val modules by repository.modules.collectAsState()
    var searchQuery by remember { mutableStateOf("") }
    var isSearching by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(CyberDark)
            .padding(16.dp)
    ) {
        // Top App Bar: Grid Icon, "All Modules", Search Icon
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.GridView,
                contentDescription = null,
                tint = TextWhite,
                modifier = Modifier.size(24.dp)
            )

            Text(
                text = "All Modules",
                color = TextWhite,
                fontWeight = FontWeight.Bold,
                fontSize = 18.sp
            )

            Icon(
                imageVector = Icons.Default.Search,
                contentDescription = "Search",
                tint = TextWhite,
                modifier = Modifier
                    .size(24.dp)
                    .clickable { isSearching = !isSearching }
            )
        }

        if (isSearching) {
            OutlinedTextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                placeholder = { Text("Filter 12 modules...") },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp),
                shape = RoundedCornerShape(12.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = CyberCyan,
                    unfocusedBorderColor = GlassBorder,
                    focusedTextColor = TextWhite,
                    unfocusedTextColor = TextWhite
                )
            )
        }

        Spacer(modifier = Modifier.height(14.dp))

        val filtered = modules.filter {
            it.name.contains(searchQuery, ignoreCase = true) ||
            it.tagline.contains(searchQuery, ignoreCase = true)
        }

        val scrollState = rememberScrollState()
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(scrollState),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            // Render 12 modules in 3-column rows matching screenshot
            val chunked = filtered.chunked(3)
            for (row in chunked) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    for (module in row) {
                        ModuleCardCompact(
                            module = module,
                            accentColor = when (module.id) {
                                "identity_guardian" -> CyberBlue
                                "phishing_shield" -> Color(0xFFA855F7)
                                "endpoint_guardian" -> CyberGreen
                                "network_sentinel" -> CyberCyan
                                "vault_guardian" -> CyberOrange
                                "ransomware_guardian" -> CyberRed
                                "webshield" -> CyberBlue
                                "digital_forensics" -> CyberCyan
                                "access_guardian" -> CyberGreen
                                "threat_intelligence" -> CyberOrange
                                "cloud_backup_guardian" -> CyberBlue
                                else -> Color(0xFFA855F7)
                            },
                            modifier = Modifier.weight(1f)
                        ) {
                            onNavigateModule(module.id)
                        }
                    }
                    if (row.size < 3) {
                        for (i in 0 until (3 - row.size)) {
                            Spacer(modifier = Modifier.weight(1f))
                        }
                    }
                }
            }
            Spacer(modifier = Modifier.height(16.dp))
        }
    }
}

@Composable
fun ModuleDetailScreen(
    moduleId: String,
    repository: SecurityRepository,
    onBack: () -> Unit
) {
    val modules by repository.modules.collectAsState()
    val module = modules.find { it.id == moduleId } ?: modules.first()

    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(CyberDark)
            .padding(16.dp)
            .verticalScroll(scrollState)
    ) {
        // App Bar: Back Arrow, Title
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
                text = module.name,
                color = TextWhite,
                fontWeight = FontWeight.Bold,
                fontSize = 18.sp
            )
        }

        Spacer(modifier = Modifier.height(20.dp))

        // SPECIAL CASE 1: Identity Guardian (Screenshot 3)
        if (module.id == "identity_guardian") {
            IdentityGuardianDetail(module)
        }
        // SPECIAL CASE 2: Phishing Shield (Screenshot 4)
        else if (module.id == "phishing_shield") {
            PhishingShieldDetail(module)
        }
        // GENERIC 12-MODULE DETAILED VIEW
        else {
            GenericModuleDetail(module)
        }
    }
}

@Composable
private fun IdentityGuardianDetail(module: SecurityModule) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Glowing Fingerprint Graphic with Green Verified Checkmark
        Box(
            modifier = Modifier
                .size(160.dp)
                .border(1.dp, GlassBorderBright, RoundedCornerShape(28.dp))
                .background(Color(0xFF07193F), RoundedCornerShape(28.dp)),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.Fingerprint,
                contentDescription = null,
                tint = CyberCyan,
                modifier = Modifier.size(96.dp)
            )

            // Green Verified Badge on bottom-right of fingerprint
            Box(
                modifier = Modifier
                    .align(Alignment.BottomEnd)
                    .padding(12.dp)
                    .size(26.dp)
                    .background(CyberGreen, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Check,
                    contentDescription = null,
                    tint = CyberDarker,
                    modifier = Modifier.size(16.dp)
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = "Identity Guardian",
            color = TextWhite,
            fontWeight = FontWeight.Black,
            fontSize = 20.sp
        )
        Text(
            text = "Digital identity & account protection",
            color = TextMuted,
            fontSize = 12.sp
        )

        Spacer(modifier = Modifier.height(24.dp))

        // Features Checklist
        CyberCard {
            module.features.forEach { feature ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 10.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.Shield,
                        contentDescription = null,
                        tint = CyberBlue,
                        modifier = Modifier.size(20.dp)
                    )
                    Spacer(modifier = Modifier.width(12.dp))
                    Text(
                        text = feature,
                        color = TextWhite,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }
                Divider(color = Color(0x20FFFFFF), thickness = 0.5.dp)
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Status Card: "Your Account is Secure"
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .border(1.dp, Color(0x6000D68F), RoundedCornerShape(16.dp)),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF042617))
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = Icons.Default.CheckCircle,
                    contentDescription = null,
                    tint = CyberGreen,
                    modifier = Modifier.size(22.dp)
                )
                Spacer(modifier = Modifier.width(10.dp))
                Text(
                    text = "Your Account is Secure",
                    color = Color(0xFF86EFAC),
                    fontWeight = FontWeight.Bold,
                    fontSize = 14.sp
                )
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        CyberButton(
            text = "View Details  →",
            onClick = {}
        )
    }
}

@Composable
private fun PhishingShieldDetail(module: SecurityModule) {
    var urlToScan by remember { mutableStateOf("") }
    var scanned by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier.fillMaxWidth(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Glowing Purple Shield Graphic with Mail & Red Alert
        Box(
            modifier = Modifier
                .size(140.dp)
                .border(1.dp, Color(0x60A855F7), RoundedCornerShape(28.dp))
                .background(Color(0xFF1B0B35), RoundedCornerShape(28.dp)),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.Email,
                contentDescription = null,
                tint = Color(0xFFA855F7),
                modifier = Modifier.size(70.dp)
            )

            // Red Alert Badge
            Box(
                modifier = Modifier
                    .align(Alignment.BottomEnd)
                    .padding(12.dp)
                    .size(24.dp)
                    .background(CyberRed, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Text("!", color = TextWhite, fontWeight = FontWeight.Bold, fontSize = 14.sp)
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        Text(
            text = "Phishing Shield",
            color = TextWhite,
            fontWeight = FontWeight.Black,
            fontSize = 20.sp
        )
        Text(
            text = "Detect and block phishing threats",
            color = TextMuted,
            fontSize = 12.sp
        )

        Spacer(modifier = Modifier.height(20.dp))

        // URL Input
        OutlinedTextField(
            value = urlToScan,
            onValueChange = { urlToScan = it },
            placeholder = { Text("Enter URL to scan...") },
            leadingIcon = { Icon(Icons.Default.Link, contentDescription = null, tint = CyberBlue) },
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(14.dp),
            colors = OutlinedTextFieldDefaults.colors(
                focusedBorderColor = CyberBlue,
                unfocusedBorderColor = GlassBorder,
                focusedTextColor = TextWhite,
                unfocusedTextColor = TextWhite
            )
        )

        Spacer(modifier = Modifier.height(14.dp))

        CyberButton(
            text = "🔍  Scan Now",
            onClick = { scanned = true }
        )

        Spacer(modifier = Modifier.height(20.dp))

        // Safe Link Card (Screenshot 4)
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .border(1.dp, Color(0x6000D68F), RoundedCornerShape(16.dp)),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF042617))
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = Icons.Default.CheckCircle,
                    contentDescription = null,
                    tint = CyberGreen,
                    modifier = Modifier.size(22.dp)
                )
                Spacer(modifier = Modifier.width(10.dp))
                Column {
                    Text(
                        text = "Safe Link",
                        color = TextWhite,
                        fontWeight = FontWeight.Bold,
                        fontSize = 14.sp
                    )
                    Text(
                        text = "This link is safe to visit.",
                        color = Color(0xFF86EFAC),
                        fontSize = 12.sp
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Threat Info Card (Screenshot 4)
        CyberCard {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Default.Info,
                    contentDescription = null,
                    tint = CyberCyan,
                    modifier = Modifier.size(20.dp)
                )
                Spacer(modifier = Modifier.width(10.dp))
                Column {
                    Text(
                        text = "Threat Info",
                        color = TextWhite,
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp
                    )
                    Text(
                        text = "Last checked: 10 Nov 2026, 09:41 AM",
                        color = TextMuted,
                        fontSize = 11.sp
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        Text(
            text = "Report Suspicious Link  →",
            color = CyberCyan,
            fontSize = 13.sp,
            fontWeight = FontWeight.SemiBold,
            modifier = Modifier.clickable {}
        )
    }
}

@Composable
private fun GenericModuleDetail(module: SecurityModule) {
    Column(modifier = Modifier.fillMaxWidth()) {
        CyberCard {
            Text(
                text = module.tagline,
                color = CyberCyan,
                fontWeight = FontWeight.SemiBold,
                fontSize = 13.sp
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = module.desc,
                color = TextWhite,
                fontSize = 14.sp,
                lineHeight = 20.sp
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = "Active Protection Features",
            color = TextWhite,
            fontWeight = FontWeight.Bold,
            fontSize = 16.sp
        )

        Spacer(modifier = Modifier.height(10.dp))

        CyberCard {
            module.features.forEach { feat ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 8.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.CheckCircle,
                        contentDescription = null,
                        tint = CyberGreen,
                        modifier = Modifier.size(18.dp)
                    )
                    Spacer(modifier = Modifier.width(10.dp))
                    Text(feat, color = TextWhite, fontSize = 13.sp)
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        CyberButton(
            text = "Run ${module.name} Audit",
            onClick = {}
        )
    }
}
