import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { VaultService } from './vault.service';

@Controller('vault')
export class VaultController {
  constructor(private vaultService: VaultService) {}

  @Get()
  getAll() {
    return this.vaultService.getVaultItems();
  }

  @Post()
  add(@Body() body: any) {
    return this.vaultService.addVaultItem(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.vaultService.deleteVaultItem(id);
  }
}
