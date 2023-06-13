import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";
import { UserRoom } from "./UserRoom.entity";

@Entity()
export class Room extends BaseEntity {

  @PrimaryColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  user_id: string

  @ManyToOne(() => User, (user)=> user.rooms)
  @JoinColumn({name: "user_id", referencedColumnName: "id"})
  createdBy: User

  @OneToMany(() => UserRoom, x => x.room)
  userRoom: UserRoom[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}