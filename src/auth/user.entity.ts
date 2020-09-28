import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bycrpt from "bcrypt";
import { Task } from "src/tasks/task.entity";

@Entity()
@Unique(['username'])
export  class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    username : string;

    @Column({select:false})
    password : string;

    @Column()
    salt : string;

    @OneToMany(type => Task, task => task.user, {eager:true})
    tasks : Task[];
    
    async validatePassword(password : string) : Promise<boolean>{
        const hash = await bycrpt.hash(password, this.salt);
        return hash === this.password;
    }
}