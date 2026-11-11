import { Controller, Get, Param, Delete } from '@nestjs/common';
import { DevicesService } from './devices.service';

@Controller('devices')
export class DevicesController {
  constructor(private devicesService: DevicesService) {}

  @Get()
  getAll() {
    return this.devicesService.getAllDevices();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.devicesService.getDevice(id);
  }

  @Delete(':id')
  revoke(@Param('id') id: string) {
    return this.devicesService.revokeDevice(id);
  }
}
