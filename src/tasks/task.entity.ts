import { User } from 'src/auth/user.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn  } from 'typeorm';
import { TaskStatus } from './task-status.enum';


@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({type: 'enum', enum: TaskStatus, default: TaskStatus.OPEN})
  status: TaskStatus;

  @CreateDateColumn()
  createTime : Date;

  @UpdateDateColumn()
  updateTime : Date;

  @ManyToOne(type => User, user => user.tasks, {eager:false})
  user: User;

  // @Column()
  // userId : number;


}