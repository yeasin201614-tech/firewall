import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GatewayModule } from './gateway/gateway.module';
import { AuthModule } from './auth/auth.module';
import { ModulesModule } from './modules/modules.module';
import { AlertsModule } from './alerts/alerts.module';
import { DevicesModule } from './devices/devices.module';
import { OverviewModule } from './overview/overview.module';
import { VaultModule } from './vault/vault.module';
import { SocModule } from './soc/soc.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [
    PrismaModule,
    SupabaseModule,
    GatewayModule,
    AuthModule,
    ModulesModule,
    AlertsModule,
    DevicesModule,
    OverviewModule,
    VaultModule,
    SocModule,
  ],
})
export class AppModule {}
