import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  receiverUsername: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}

export class MessageResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  sender: {
    id: number;
    username: string;
  };

  @ApiProperty()
  receiver: {
    id: number;
    username: string;
  };

  @ApiProperty()
  isRead: boolean;

  @ApiProperty()
  createdAt: Date;
} 