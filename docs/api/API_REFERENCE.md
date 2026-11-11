# FIREWALL — REST & WebSocket API Specification

Base URL: `http://localhost:4000`
WebSocket URL: `ws://localhost:4000`
Swagger UI: `http://localhost:4000/api/docs`

## 1. Authentication Endpoints

### `POST /auth/login`
Authenticates a user.
- **Request Body:**
  ```json
  {
    "email": "yeasin@example.com",
    "password": "Firewall@2026!"
  }
  ```
- **Response (MFA Enabled):**
  ```json
  {
    "requiresMfa": true,
    "tempToken": "eyJhbGciOi...",
    "user": { "id": "usr-yeasin-01", "fullName": "Yeasin Arafat", "role": "SUPER_USER" }
  }
  ```

### `POST /auth/mfa/verify`
Confirms TOTP / Biometric challenge token.
- **Request Body:**
  ```json
  {
    "code": "123456",
    "tempToken": "eyJhbGciOi..."
  }
  ```

---

## 2. Security Modules Endpoints

### `GET /modules`
Returns all 12 security modules with real-time operational status, score, and features.

### `GET /modules/:id`
Retrieves single module diagnostics.

### `POST /modules/:id/scan`
Triggers an autonomous diagnostic scan and emits live progress over WebSockets.

### `POST /modules/phishing_shield/check-url`
Scans a target URL against phishing heuristic signatures and reputation databases.

### `POST /modules/network_sentinel/scan`
Executes an active Wi-Fi, open port, and ARP spoofing assessment.

---

## 3. Alerts & Incident Management

### `GET /alerts`
Query parameter: `severity=CRITICAL | WARNING | INFO | ALL`

### `POST /alerts/:id/resolve`
Acknowledges and marks an incident resolved.

---

## 4. Encrypted Vault (Zero-Knowledge)

### `GET /vault`
Returns encrypted blobs with unique initialization vectors (IVs).

### `POST /vault`
Adds an AES-256-GCM encrypted record to the enclave.

---

## 5. SOC Telemetry & Real-Time Gateway

### WebSocket Events
- `connected`: Handshake confirmation
- `security_alert`: Real-time critical alert broadcast
- `scan_progress`: Module audit percentage (`progress`, `step`)
- `system_metric`: Global threat stream count updates
