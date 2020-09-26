import { User } from 'src/auth/user.entity';
import { Category } from 'src/category/category.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, UpdateDateColumn  } from 'typeorm';
import { TaskStatus } from './task-status.enum';


@Entity()
export class Task extends BaseEntity {
  @PrimaryColumn()
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

  @Column()
  userId : number;

  // @ManyToMany(type => Category,category => category.tasks, {cascade: ["insert"]})
  @ManyToMany(type => Category,category => category.tasks, {eager:true, cascade: ["update"]})
  @JoinTable(
    {
      name: 'tasks_categories',
      joinColumn : {
        name : 'task_id'
      },
      inverseJoinColumn : {
        name : 'category_id'
      },

  })
  categories: Category[];

}