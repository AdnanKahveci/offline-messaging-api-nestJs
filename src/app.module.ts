import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { BlockModule } from './block/block.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    MessagesModule,
    BlockModule,
    ActivityModule,
  ],
})
export class AppModule {}
