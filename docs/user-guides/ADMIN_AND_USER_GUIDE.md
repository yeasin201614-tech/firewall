# FIREWALL — Administrator & User Guide

## 1. Quickstart (Development Mode)

### Prerequisites
- Node.js >= 20.x
- npm >= 10.x
- Android Studio Iguana / Jellyfish (JDK 17+)
- Docker & Docker Compose (optional for containerized deployment)

### Installing Monorepo Dependencies
```bash
cd c:\firewall
npm install
```

### Running the Services
1. **API Server (Port 4000):**
   ```bash
   npm run dev:api
   ```
2. **Customer Web Portal (Port 3000):**
   ```bash
   npm run dev:web
   ```
3. **Enterprise SOC Admin Console (Port 3001):**
   ```bash
   npm run dev:admin
   ```
4. **Android Native App:**
   - Open `apps/android` in Android Studio.
   - Build and run on an emulator (API 26+) or connected physical Android device.

---

## 2. Default Seed Accounts

| Account | Email | Password | Role | Features |
| :--- | :--- | :--- | :--- | :--- |
| **Yeasin Arafat** | `yeasin@example.com` | `Firewall@2026!` | Super User | Full access to 12 modules, Vault, Alerts, Devices |
| **Chief SecOps** | `admin@firewall.cyber` | `SecOps#GodMode2026` | Super Admin | SOC Command Center, Threat feeds, Policy rules |

*Note: For MFA verification, enter code `123456` or scan the generated TOTP QR code.*
