import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Room } from "./Room.entity";
import { User } from "./User.entity";

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(()=> Room, (room)=> room.id)
  room_id: Room

  @Column()
  user_id: string

  @ManyToOne(()=> User, (user)=> user.id)
  @JoinColumn({name: "user_id", referencedColumnName: "id"})
  user: User

  @Column({type: 'text'})
  content: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}