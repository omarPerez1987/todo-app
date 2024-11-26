import { Module } from '@nestjs/common';
import { SyncController } from './sync.controller';
import { DatabaseModule } from 'src/database/database.module';
import { SyncService } from './sync.service';
import { TaskService } from 'src/task/task.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SyncController],
  providers: [SyncService, TaskService],
})
export class SyncModule {}
