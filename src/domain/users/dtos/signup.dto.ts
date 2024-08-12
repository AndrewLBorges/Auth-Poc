import { IsEmail, IsEnum, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Role } from 'src/core/enums/role.enum';

export class SignupDto {
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
  confirmPassword: string;
  @IsEnum(Role)
  role: Role;
}
