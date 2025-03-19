import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Block {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.blockedUsers)
  @JoinColumn({ name: 'blockerId' })
  blocker: User;

  @Column()
  blockerId: number;

  @ManyToOne(() => User, user => user.blockedByUsers)
  @JoinColumn({ name: 'blockedId' })
  blocked: User;

  @Column()
  blockedId: number;

  @CreateDateColumn()
  createdAt: Date;
} 