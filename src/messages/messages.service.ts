import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { User } from '../entities/user.entity';
import { CreateMessageDto } from './dto/message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async sendMessage(senderId: number, createMessageDto: CreateMessageDto): Promise<Message> {
    const { receiverUsername, content } = createMessageDto;

    // Find receiver by username
    const receiver = await this.userRepository.findOne({
      where: { username: receiverUsername },
    });

    if (!receiver) {
      throw new NotFoundException(`User ${receiverUsername} not found`);
    }

    // Check if receiver has blocked sender
    const isBlocked = await this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.blockedUsers', 'block')
      .where('block.blockerId = :receiverId', { receiverId: receiver.id })
      .andWhere('block.blockedId = :senderId', { senderId })
      .getCount();

    if (isBlocked) {
      throw new ForbiddenException('You cannot send messages to this user');
    }

    const message = this.messageRepository.create({
      content,
      sender: { id: senderId },
      receiver: { id: receiver.id },
      senderId,
      receiverId: receiver.id,
    });

    return this.messageRepository.save(message);
  }

  async getMessages(userId: number, otherUsername: string): Promise<Message[]> {
    const otherUser = await this.userRepository.findOne({
      where: { username: otherUsername },
    });

    if (!otherUser) {
      throw new NotFoundException(`User ${otherUsername} not found`);
    }

    return this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.receiver', 'receiver')
      .where(
        '(message.senderId = :userId AND message.receiverId = :otherId) OR ' +
        '(message.senderId = :otherId AND message.receiverId = :userId)',
        { userId, otherId: otherUser.id },
      )
      .orderBy('message.createdAt', 'ASC')
      .getMany();
  }

  async markAsRead(messageId: number, userId: number): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id: messageId, receiverId: userId },
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    message.isRead = true;
    return this.messageRepository.save(message);
  }
} 