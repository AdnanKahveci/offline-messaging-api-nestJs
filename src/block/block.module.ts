import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Block } from '../entities/block.entity';
import { User } from '../entities/user.entity';
import { BlockController } from './block.controller';
import { BlockService } from './block.service';

@Module({
  imports: [TypeOrmModule.forFeature([Block, User])],
  controllers: [BlockController],
  providers: [BlockService],
})
export class BlockModule {} 