import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto, MessageResponse } from './dto/message.dto';

@ApiTags('messages')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiOperation({ summary: 'Send a message to another user' })
  @ApiResponse({ status: 201, description: 'Message sent successfully', type: MessageResponse })
  @ApiResponse({ status: 404, description: 'Receiver not found' })
  @ApiResponse({ status: 403, description: 'You cannot send messages to this user' })
  async sendMessage(@Request() req, @Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.sendMessage(req.user.id, createMessageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get messages with another user' })
  @ApiResponse({ status: 200, description: 'Messages retrieved successfully', type: [MessageResponse] })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getMessages(@Request() req, @Query('username') username: string) {
    return this.messagesService.getMessages(req.user.id, username);
  }

  @Post(':id/read')
  @ApiOperation({ summary: 'Mark a message as read' })
  @ApiResponse({ status: 200, description: 'Message marked as read', type: MessageResponse })
  @ApiResponse({ status: 404, description: 'Message not found' })
  async markAsRead(@Request() req, @Param('id') id: number) {
    return this.messagesService.markAsRead(id, req.user.id);
  }
} 