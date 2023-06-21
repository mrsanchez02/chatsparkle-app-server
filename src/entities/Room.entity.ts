import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";
import { UserRoom } from "./UserRoom.entity";

@Entity()
export class Room extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index({ unique: true })
  @Column()
  name: string

  @Column()
  user_id: string

  @ManyToOne(() => User, (user)=> user.rooms)
  @JoinColumn({name: "user_id", referencedColumnName: "id"})
  createdBy: User

  @OneToMany(() => UserRoom, x => x.room, {
    cascade: ["remove","soft-remove"]
  })
  userRoom: UserRoom[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}