import { Role } from 'src/core/enums/role.enum';

export class CreateUserDto {
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
}
