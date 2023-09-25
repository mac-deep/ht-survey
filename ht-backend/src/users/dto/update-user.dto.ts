import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Messages } from 'src/helpers/validation-messages';

export class UpdateUserDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsDateString({ strict: true } as any)
  @IsNotEmpty({ message: Messages.DOB_REQUIRED })
  dob: Date;

  @IsPhoneNumber('IN')
  phoneNo: string;
}
