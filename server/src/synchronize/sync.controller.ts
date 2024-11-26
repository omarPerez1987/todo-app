import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SyncService } from './sync.service';
import { ZodValidationPipe } from 'src/pipes/validation.pipes';
import { paramsSchema, pushChangeSchema, PushSyncDto } from './sync.validation';

@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Get()
  async pullChanges(
    @Query('last_pulled_at', new ZodValidationPipe(paramsSchema))
    lastPulledAt: string,
  ) {
    const lastSyncDate = lastPulledAt ? new Date(Number(lastPulledAt)) : null;
    return await this.syncService.pullChanges(lastSyncDate);
  }

  @Post()
  async pushChanges(
    @Query('last_pulled_at', new ZodValidationPipe(paramsSchema))
    lastPulledAt: string,
    @Body(new ZodValidationPipe(pushChangeSchema)) changes: PushSyncDto,
  ) {
    await this.syncService.pushChanges(changes);
    return { success: true };
  }
}
