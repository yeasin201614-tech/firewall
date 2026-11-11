import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { AlertsService } from './alerts.service';

@Controller('alerts')
export class AlertsController {
  constructor(private alertsService: AlertsService) {}

  @Get()
  getAll(@Query('severity') severity?: string) {
    return this.alertsService.getAllAlerts(severity);
  }

  @Post(':id/resolve')
  resolve(@Param('id') id: string) {
    return this.alertsService.resolveAlert(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.alertsService.createAlert(body);
  }
}
