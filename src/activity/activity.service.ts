import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from '../entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async logActivity(userId: number, action: string, details?: string): Promise<Activity> {
    const activity = this.activityRepository.create({
      userId,
      action,
      details,
    });

    return this.activityRepository.save(activity);
  }

  async getUserActivities(userId: number): Promise<Activity[]> {
    return this.activityRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }
} 