package com.firewall.security.navigation

sealed class Screen(val route: String) {
    // Auth & Onboarding Flow
    object Splash : Screen("splash")
    object Onboarding : Screen("onboarding")
    object Welcome : Screen("welcome")
    object Login : Screen("login")
    object Registration : Screen("registration")
    object ForgotPassword : Screen("forgot_password")
    object MfaVerification : Screen("mfa_verification")

    // Core Tabs (Bottom Navigation)
    object Home : Screen("home")
    object Modules : Screen("modules")
    object Alerts : Screen("alerts")
    object Profile : Screen("profile")

    // Dedicated Feature Screens
    object ModuleDetail : Screen("module_detail/{moduleId}") {
        fun createRoute(moduleId: String) = "module_detail/$moduleId"
    }
    object MyDevices : Screen("devices")
    object ScanHistory : Screen("scan_history")
    object ThreatReports : Screen("threat_reports")
    object SecureVault : Screen("vault")
    object BackupCenter : Screen("backup")
    object NetworkSecurity : Screen("network_security")
    object SecuritySettings : Screen("security_settings")
    object NotificationSettings : Screen("notification_settings")
    object HelpSupport : Screen("help_support")
}
