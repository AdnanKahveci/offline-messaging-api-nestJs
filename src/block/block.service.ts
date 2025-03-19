import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Block } from '../entities/block.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(Block)
    private blockRepository: Repository<Block>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async blockUser(blockerId: number, blockedUsername: string): Promise<Block> {
    const blockedUser = await this.userRepository.findOne({
      where: { username: blockedUsername },
    });

    if (!blockedUser) {
      throw new NotFoundException(`User ${blockedUsername} not found`);
    }

    if (blockerId === blockedUser.id) {
      throw new ConflictException('You cannot block yourself');
    }

    const existingBlock = await this.blockRepository.findOne({
      where: {
        blockerId,
        blockedId: blockedUser.id,
      },
    });

    if (existingBlock) {
      throw new ConflictException('User is already blocked');
    }

    const block = this.blockRepository.create({
      blocker: { id: blockerId },
      blocked: { id: blockedUser.id },
      blockerId,
      blockedId: blockedUser.id,
    });

    return this.blockRepository.save(block);
  }

  async unblockUser(blockerId: number, blockedUsername: string): Promise<void> {
    const blockedUser = await this.userRepository.findOne({
      where: { username: blockedUsername },
    });

    if (!blockedUser) {
      throw new NotFoundException(`User ${blockedUsername} not found`);
    }

    const block = await this.blockRepository.findOne({
      where: {
        blockerId,
        blockedId: blockedUser.id,
      },
    });

    if (!block) {
      throw new NotFoundException('Block not found');
    }

    await this.blockRepository.remove(block);
  }

  async getBlockedUsers(userId: number): Promise<User[]> {
    const blocks = await this.blockRepository.find({
      where: { blockerId: userId },
      relations: ['blocked'],
    });

    return blocks.map(block => block.blocked);
  }
} 