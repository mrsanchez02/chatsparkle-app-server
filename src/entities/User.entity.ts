import {BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'
import bcrypt from 'bcryptjs'
import { UserRoom } from './UserRoom.entity'
import { Room } from './Room.entity'

type IUserRoles = 'admin'|'user'|'superadmin'

@Entity()
export class User extends BaseEntity{
  
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string
  
  @Column({unique: true})
  email: string

  @Column({unique: true})
  userName: string
  
  @Column({select: false})
  password: string

  @Column({default: 'user'})
  role: IUserRoles

  @Column({default: true})
  active: boolean

  @OneToMany(() => Room, x => x.createdBy)
  rooms: Room[]

  @OneToMany(() => UserRoom, x => x.user)
  userRoom: UserRoom[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  async encryptPassword(pass: string): Promise<string>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(pass, salt)
  }

  async validatePassword(pass: string): Promise<boolean>{
    return await bcrypt.compare(pass, this.password)
  }

}
