import { Task } from 'src/tasks/task.entity';
import { BaseEntity, Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @PrimaryColumn({nullable : false, type: 'integer' })
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  userId:number;

  @ManyToMany(type=>Task, task => task.categories, {eager:false} )
  tasks : Task[]
}