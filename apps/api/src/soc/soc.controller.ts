import { Controller, Get } from '@nestjs/common';
import { SocService } from './soc.service';

@Controller('soc')
export class SocController {
  constructor(private socService: SocService) {}

  @Get('metrics')
  getMetrics() {
    return this.socService.getMetrics();
  }

  @Get('threat-feeds')
  getThreatFeeds() {
    return this.socService.getThreatFeeds();
  }
}
