"use strict";
/**
 * FIREWALL — Enterprise Cybersecurity Ecosystem
 * Core Type Definitions & API Contracts
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertSeverity = exports.SecurityModuleId = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["SUPER_ADMIN"] = "SUPER_ADMIN";
    UserRole["SOC_ANALYST"] = "SOC_ANALYST";
    UserRole["SUPER_USER"] = "SUPER_USER";
    UserRole["USER"] = "USER";
})(UserRole || (exports.UserRole = UserRole = {}));
var SecurityModuleId;
(function (SecurityModuleId) {
    SecurityModuleId["IDENTITY_GUARDIAN"] = "identity_guardian";
    SecurityModuleId["PHISHING_SHIELD"] = "phishing_shield";
    SecurityModuleId["ENDPOINT_GUARDIAN"] = "endpoint_guardian";
    SecurityModuleId["NETWORK_SENTINEL"] = "network_sentinel";
    SecurityModuleId["VAULT_GUARDIAN"] = "vault_guardian";
    SecurityModuleId["RANSOMWARE_GUARDIAN"] = "ransomware_guardian";
    SecurityModuleId["WEBSHIELD"] = "webshield";
    SecurityModuleId["DIGITAL_FORENSICS"] = "digital_forensics";
    SecurityModuleId["ACCESS_GUARDIAN"] = "access_guardian";
    SecurityModuleId["THREAT_INTELLIGENCE"] = "threat_intelligence";
    SecurityModuleId["CLOUD_BACKUP_GUARDIAN"] = "cloud_backup_guardian";
    SecurityModuleId["CYBER_SOC"] = "cyber_soc";
})(SecurityModuleId || (exports.SecurityModuleId = SecurityModuleId = {}));
var AlertSeverity;
(function (AlertSeverity) {
    AlertSeverity["CRITICAL"] = "CRITICAL";
    AlertSeverity["WARNING"] = "WARNING";
    AlertSeverity["INFO"] = "INFO";
})(AlertSeverity || (exports.AlertSeverity = AlertSeverity = {}));
//# sourceMappingURL=index.js.map