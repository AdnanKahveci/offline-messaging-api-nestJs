import { Controller, Post, Delete, Get, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BlockService } from './block.service';
import { User } from '../entities/user.entity';

@ApiTags('block')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post(':username')
  @ApiOperation({ summary: 'Block a user' })
  @ApiResponse({ status: 201, description: 'User blocked successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 409, description: 'User is already blocked or cannot block yourself' })
  async blockUser(@Request() req, @Param('username') username: string) {
    return this.blockService.blockUser(req.user.id, username);
  }

  @Delete(':username')
  @ApiOperation({ summary: 'Unblock a user' })
  @ApiResponse({ status: 200, description: 'User unblocked successfully' })
  @ApiResponse({ status: 404, description: 'User or block not found' })
  async unblockUser(@Request() req, @Param('username') username: string) {
    return this.blockService.unblockUser(req.user.id, username);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of blocked users' })
  @ApiResponse({ status: 200, description: 'List of blocked users', type: [User] })
  async getBlockedUsers(@Request() req) {
    return this.blockService.getBlockedUsers(req.user.id);
  }
} 