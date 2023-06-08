import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'
import bcrypt from 'bcryptjs'

@Entity()
export class User extends BaseEntity{
  
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({type: 'text'})
  firstName: string

  @Column({type: 'text'})
  lastName: string
  
  @Column({unique: true})
  email: string
  
  @Column({type: 'text'})
  password: string

  @Column({default: true})
  active: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  async encryptPassword(pass: string): Promise<string>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(pass, salt)
  }

  async validatePassword(pass: string): Promise<boolean>{
    return await bcrypt.compare(pass, this.password)
  }

}
