package com.firewall.security.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.navArgument
import com.firewall.security.data.repository.SecurityRepository
import com.firewall.security.presentation.screens.*

@Composable
fun FirewallNavGraph(
    navController: NavHostController,
    repository: SecurityRepository
) {
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    // Show bottom bar only on primary tabs
    val showBottomBar = currentRoute in listOf(
        Screen.Home.route,
        Screen.Modules.route,
        Screen.Alerts.route,
        Screen.Profile.route
    )

    Scaffold(
        bottomBar = {
            if (showBottomBar) {
                FirewallBottomNavBar(
                    currentRoute = currentRoute,
                    onNavigate = { route ->
                        navController.navigate(route) {
                            popUpTo(Screen.Home.route) { saveState = true }
                            launchSingleTop = true
                            restoreState = true
                        }
                    }
                )
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Screen.Splash.route,
            modifier = Modifier.padding(innerPadding)
        ) {
            // 1. Splash
            composable(Screen.Splash.route) {
                SplashScreen(
                    onTimeout = {
                        navController.navigate(Screen.Welcome.route) {
                            popUpTo(Screen.Splash.route) { inclusive = true }
                        }
                    }
                )
            }

            // 2. Onboarding
            composable(Screen.Onboarding.route) {
                OnboardingScreen(
                    onFinish = {
                        navController.navigate(Screen.Login.route) {
                            popUpTo(Screen.Onboarding.route) { inclusive = true }
                        }
                    }
                )
            }

            // 3. Welcome
            composable(Screen.Welcome.route) {
                WelcomeScreen(
                    onGetStarted = {
                        navController.navigate(Screen.Login.route)
                    },
                    onLearnMore = {
                        navController.navigate(Screen.Onboarding.route)
                    }
                )
            }

            // 4. Login
            composable(Screen.Login.route) {
                LoginScreen(
                    onLoginSuccess = { requiresMfa ->
                        if (requiresMfa) {
                            navController.navigate(Screen.MfaVerification.route)
                        } else {
                            navController.navigate(Screen.Home.route) {
                                popUpTo(Screen.Login.route) { inclusive = true }
                            }
                        }
                    },
                    onNavigateRegister = { navController.navigate(Screen.Registration.route) },
                    onForgotPassword = { navController.navigate(Screen.ForgotPassword.route) }
                )
            }

            // 5. Registration
            composable(Screen.Registration.route) {
                RegistrationScreen(
                    onRegisterSuccess = {
                        navController.navigate(Screen.Home.route) {
                            popUpTo(Screen.Registration.route) { inclusive = true }
                        }
                    },
                    onNavigateLogin = { navController.popBackStack() }
                )
            }

            // 6. Forgot Password
            composable(Screen.ForgotPassword.route) {
                ForgotPasswordScreen(onBackToLogin = { navController.popBackStack() })
            }

            // 7. MFA Verification
            composable(Screen.MfaVerification.route) {
                MfaVerificationScreen(
                    onMfaSuccess = {
                        navController.navigate(Screen.Home.route) {
                            popUpTo(Screen.Login.route) { inclusive = true }
                        }
                    }
                )
            }

            // 8. Home Dashboard (Tab)
            composable(Screen.Home.route) {
                HomeDashboardScreen(
                    repository = repository,
                    onNavigateModule = { moduleId ->
                        navController.navigate(Screen.ModuleDetail.createRoute(moduleId))
                    },
                    onNavigateAllModules = { navController.navigate(Screen.Modules.route) },
                    onNavigateAlerts = { navController.navigate(Screen.Alerts.route) },
                    onNavigateDevices = { navController.navigate(Screen.MyDevices.route) },
                    onNavigateScan = { navController.navigate(Screen.NetworkSecurity.route) }
                )
            }

            // 9. All Security Modules (Tab)
            composable(Screen.Modules.route) {
                AllModulesScreen(
                    repository = repository,
                    onNavigateModule = { moduleId ->
                        navController.navigate(Screen.ModuleDetail.createRoute(moduleId))
                    },
                    onBack = { navController.popBackStack() }
                )
            }

            // 10. Individual Module Detail
            composable(
                route = Screen.ModuleDetail.route,
                arguments = listOf(navArgument("moduleId") { type = NavType.StringType })
            ) { backStackEntry ->
                val moduleId = backStackEntry.arguments?.getString("moduleId") ?: "identity_guardian"
                ModuleDetailScreen(
                    moduleId = moduleId,
                    repository = repository,
                    onBack = { navController.popBackStack() }
                )
            }

            // 11. Security Alerts (Tab)
            composable(Screen.Alerts.route) {
                SecurityAlertsScreen(
                    repository = repository,
                    onBack = { navController.popBackStack() }
                )
            }

            // 12. My Devices
            composable(Screen.MyDevices.route) {
                MyDevicesScreen(
                    repository = repository,
                    onBack = { navController.popBackStack() }
                )
            }

            // 13. Scan History
            composable(Screen.ScanHistory.route) {
                ScanHistoryScreen(
                    repository = repository,
                    onBack = { navController.popBackStack() }
                )
            }

            // 14. Threat Reports
            composable(Screen.ThreatReports.route) {
                ThreatReportsScreen(onBack = { navController.popBackStack() })
            }

            // 15. Secure Vault
            composable(Screen.SecureVault.route) {
                SecureVaultScreen(
                    repository = repository,
                    onBack = { navController.popBackStack() }
                )
            }

            // 16. Backup Center
            composable(Screen.BackupCenter.route) {
                BackupCenterScreen(onBack = { navController.popBackStack() })
            }

            // 17. Network Security (Network Sentinel)
            composable(Screen.NetworkSecurity.route) {
                NetworkSecurityScreen(onBack = { navController.popBackStack() })
            }

            // 18. Account Profile (Tab)
            composable(Screen.Profile.route) {
                AccountProfileScreen(
                    repository = repository,
                    onNavigateSecuritySettings = { navController.navigate(Screen.SecuritySettings.route) },
                    onNavigateNotificationSettings = { navController.navigate(Screen.NotificationSettings.route) },
                    onNavigateScanHistory = { navController.navigate(Screen.ScanHistory.route) },
                    onNavigateHelp = { navController.navigate(Screen.HelpSupport.route) },
                    onLogout = {
                        navController.navigate(Screen.Login.route) {
                            popUpTo(Screen.Home.route) { inclusive = true }
                        }
                    },
                    onBack = { navController.popBackStack() }
                )
            }

            // 19. Security Settings
            composable(Screen.SecuritySettings.route) {
                SecuritySettingsScreen(onBack = { navController.popBackStack() })
            }

            // 20. Notification Settings
            composable(Screen.NotificationSettings.route) {
                NotificationSettingsScreen(onBack = { navController.popBackStack() })
            }

            // 21. Help & Support
            composable(Screen.HelpSupport.route) {
                HelpSupportScreen(onBack = { navController.popBackStack() })
            }
        }
    }
}
