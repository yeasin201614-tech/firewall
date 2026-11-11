import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { SecurityModuleId } from '@firewall/shared-types';

@Controller('modules')
export class ModulesController {
  constructor(private modulesService: ModulesService) {}

  @Get()
  getAll() {
    return this.modulesService.getAllModules();
  }

  @Get(':id')
  getOne(@Param('id') id: SecurityModuleId) {
    return this.modulesService.getModule(id);
  }

  @Post(':id/scan')
  triggerScan(@Param('id') id: SecurityModuleId) {
    return this.modulesService.runModuleScan(id);
  }

  @Post('phishing_shield/check-url')
  checkUrl(@Body('url') url: string) {
    return this.modulesService.checkPhishingUrl(url);
  }

  @Post('network_sentinel/scan')
  scanNetwork() {
    return this.modulesService.scanNetwork();
  }
}
