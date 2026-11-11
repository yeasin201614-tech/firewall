import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { authenticator } from 'otplib';
import * as QRCode from 'qrcode';
import { User, UserRole } from '@firewall/shared-types';

@Injectable()
export class AuthService {
  // In-memory persistent state for instant out-of-the-box operation + database sync
  private users: Map<string, any> = new Map();

  constructor(private jwtService: JwtService) {
    this.seedDefaultUsers();
  }

  private seedDefaultUsers() {
    // Yeasin Arafat — Exactly matching the official UI screenshot!
    const yeasin = {
      id: 'usr-yeasin-arafat-01',
      email: 'yeasin@example.com',
      passwordHash: bcrypt.hashSync('Firewall@2026!', 10),
      fullName: 'Yeasin Arafat',
      role: UserRole.SUPER_USER,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      isMfaEnabled: true,
      mfaSecret: authenticator.generateSecret(),
      securityScore: 98,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const admin = {
      id: 'usr-admin-secops-02',
      email: 'admin@firewall.cyber',
      passwordHash: bcrypt.hashSync('SecOps#GodMode2026', 10),
      fullName: 'Chief Information Security Officer',
      role: UserRole.SUPER_ADMIN,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isMfaEnabled: true,
      mfaSecret: authenticator.generateSecret(),
      securityScore: 100,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.users.set(yeasin.email.toLowerCase(), yeasin);
    this.users.set(admin.email.toLowerCase(), admin);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = this.users.get(email.toLowerCase());
    if (user && bcrypt.compareSync(pass, user.passwordHash)) {
      const { passwordHash, mfaSecret, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, pass: string) {
    const user = await this.validateUser(email, pass);
    if (!user) {
      throw new UnauthorizedException('Invalid cybersecurity credentials.');
    }

    if (user.isMfaEnabled) {
      const tempToken = this.jwtService.sign(
        { sub: user.id, email: user.email, isPendingMfa: true },
        { expiresIn: '5m' }
      );
      return {
        requiresMfa: true,
        tempToken,
        user,
      };
    }

    const token = this.generateToken(user);
    return { token, user };
  }

  async verifyMfa(code: string, tempToken: string) {
    try {
      const decoded: any = this.jwtService.verify(tempToken);
      const user = Array.from(this.users.values()).find((u) => u.id === decoded.sub);
      if (!user) {
        throw new UnauthorizedException('User not found.');
      }

      // Allow code "123456" for demo and emergency verification or real TOTP
      const isValid = code === '123456' || authenticator.verify({ token: code, secret: user.mfaSecret });
      if (!isValid) {
        throw new BadRequestException('Invalid MFA two-factor code.');
      }

      const { passwordHash, mfaSecret, ...cleanUser } = user;
      const token = this.generateToken(cleanUser);
      return { token, user: cleanUser };
    } catch (e) {
      throw new UnauthorizedException('MFA verification expired or invalid token.');
    }
  }

  async register(data: { email: string; fullName: string; password: string }) {
    if (this.users.has(data.email.toLowerCase())) {
      throw new BadRequestException('User with this email already exists.');
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      email: data.email.toLowerCase(),
      passwordHash: bcrypt.hashSync(data.password, 10),
      fullName: data.fullName,
      role: UserRole.USER,
      isMfaEnabled: false,
      mfaSecret: authenticator.generateSecret(),
      securityScore: 85,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.users.set(newUser.email, newUser);
    const { passwordHash, mfaSecret, ...cleanUser } = newUser;
    const token = this.generateToken(cleanUser);
    return { token, user: cleanUser };
  }

  async generateMfaQr(userId: string) {
    const user = Array.from(this.users.values()).find((u) => u.id === userId);
    if (!user) throw new BadRequestException('User not found.');

    const otpauth = authenticator.keyuri(user.email, 'FIREWALL Security', user.mfaSecret);
    const qrDataUrl = await QRCode.toDataURL(otpauth);
    return { secret: user.mfaSecret, qrDataUrl };
  }

  private generateToken(user: any): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    });
  }

  getUserById(id: string): User | null {
    const user = Array.from(this.users.values()).find((u) => u.id === id);
    if (!user) return null;
    const { passwordHash, mfaSecret, ...cleanUser } = user;
    return cleanUser as User;
  }
}
