import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Room } from "./Room.entity";
import { User } from "./User.entity";

@Entity()
export class UserRoom extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string


  @Column()
  user_id: string
  
  @Column()
  room_id: string

  @ManyToOne(()=> Room, (room) => room.userRoom)
  @JoinColumn({name: "room_id", referencedColumnName: "id"})
  room: Room

  @ManyToOne(()=> User, (user) => user.userRoom)
  @JoinColumn({name: "user_id", referencedColumnName: "id"})
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

}