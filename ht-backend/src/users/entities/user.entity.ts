import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';
import { Messages } from 'src/helpers/validation-messages';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Index()
  @Column({ unique: true })
  @IsNotEmpty()
  username: string;

  @Column()
  @IsNotEmpty()
  fullName: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsPhoneNumber('IN')
  @IsNotEmpty()
  phoneNo: string;

  @Column({ type: 'date' })
  @IsDateString({ strict: true } as any)
  @IsNotEmpty({ message: Messages.DOB_REQUIRED })
  dob: Date;
}
