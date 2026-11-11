import { Module } from '@nestjs/common';
import { OverviewService } from './overview.service';
import { OverviewController } from './overview.controller';
import { ModulesModule } from '../modules/modules.module';
import { AlertsModule } from '../alerts/alerts.module';
import { DevicesModule } from '../devices/devices.module';

@Module({
  imports: [ModulesModule, AlertsModule, DevicesModule],
  controllers: [OverviewController],
  providers: [OverviewService],
})
export class OverviewModule {}
