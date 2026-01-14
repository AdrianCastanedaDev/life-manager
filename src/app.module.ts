import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

// Config
import {
  appConfig,
  databaseConfig,
  redisConfig,
  storageConfig,
} from './config';

// Infrastructure
import { PrismaModule } from './infrastructure/prisma';
import { RedisModule } from './infrastructure/redis';

// Common
import { JwtAuthGuard } from './common/guards';

// Modules
import { HealthModule } from './health';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ItemsModule } from './modules/items/items.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { TagsModule } from './modules/tags/tags.module';
import { UploadsModule } from './modules/uploads/uploads.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, redisConfig, storageConfig],
    }),

    // Infrastructure
    PrismaModule,
    RedisModule,

    // Feature modules
    HealthModule,
    AuthModule,
    UsersModule,
    ItemsModule,
    ExpensesModule,
    TagsModule,
    UploadsModule,
  ],
  providers: [
    // Global JWT guard
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
