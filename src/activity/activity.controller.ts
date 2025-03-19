import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ActivityService } from './activity.service';
import { Activity } from '../entities/activity.entity';

@ApiTags('activity')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  @ApiOperation({ summary: 'Get user activity log' })
  @ApiResponse({ status: 200, description: 'Activity log retrieved successfully', type: [Activity] })
  async getUserActivities(@Request() req) {
    return this.activityService.getUserActivities(req.user.id);
  }
} 