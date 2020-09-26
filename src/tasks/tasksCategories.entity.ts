import { User } from 'src/auth/user.entity';
import { Category } from 'src/category/category.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, UpdateDateColumn  } from 'typeorm';
import { TaskStatus } from './task-status.enum';


@Entity({name : "tasksCategories2"})
export class tasksCategories extends BaseEntity {
  @PrimaryColumn()
  taskId: number;

  @PrimaryColumn()
  categoryId: number;

  @CreateDateColumn()
  createTime : Date;

  @UpdateDateColumn()
  updateTime : Date;

  @ManyToOne(type => User, user => user.tasks, {eager:false})
  user: User;

  @Column()
  userId : number;

  // @ManyToMany(type => Category,category => category.tasks, {cascade: ["insert"]})
  
}