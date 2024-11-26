import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { env } from 'env.validation';
import { SyncModule } from './synchronize/sync.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: () => env,
    }),
    DatabaseModule,
    TaskModule,
    SyncModule,
  ],
})
export class AppModule {}
