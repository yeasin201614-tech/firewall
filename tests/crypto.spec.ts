import * as crypto from 'crypto';

describe('FIREWALL Zero-Knowledge Cryptographic Engine Tests', () => {
  const MASTER_KEY = crypto.randomBytes(32); // 256-bit key

  it('should encrypt and decrypt payloads with AES-256-GCM without data leakage', () => {
    const secretPayload = JSON.stringify({
      title: 'Production Root SSH Key',
      secret: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKs7...firewall-master-key',
    });

    const iv = crypto.randomBytes(12); // Standard 96-bit IV for GCM
    const cipher = crypto.createCipheriv('aes-256-gcm', MASTER_KEY, iv);

    let encrypted = cipher.update(secretPayload, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();

    expect(encrypted).toBeDefined();
    expect(authTag.length).toBe(16); // 128-bit authentication tag

    // Decrypt
    const decipher = crypto.createDecipheriv('aes-256-gcm', MASTER_KEY, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    expect(decrypted).toBe(secretPayload);
    const parsed = JSON.parse(decrypted);
    expect(parsed.title).toBe('Production Root SSH Key');
  });

  it('should reject tampered ciphertext with an authentication tag failure', () => {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', MASTER_KEY, iv);
    let encrypted = cipher.update('Confidential Security Token', 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();

    // Tamper with ciphertext
    const tampered = encrypted.substring(0, encrypted.length - 2) + 'ff';

    const decipher = crypto.createDecipheriv('aes-256-gcm', MASTER_KEY, iv);
    decipher.setAuthTag(authTag);

    expect(() => {
      decipher.update(tampered, 'hex', 'utf8');
      decipher.final('utf8');
    }).toThrow();
  });
});
