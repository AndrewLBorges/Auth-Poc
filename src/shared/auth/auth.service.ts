import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/domain/users/users.service';
import { EncryptionService } from '../encryption/encryption.service';
import { ValidationError } from 'class-validator';
import { SignupDto } from 'src/domain/users/dtos/signup.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private encryptionService: EncryptionService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);

    if (this.encryptionService.comparePassword(user.password, password)) {
      const { password, confirmPassword, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      email: user._doc.email,
      sub: user._doc._id,
      role: user._doc.role,
    };
    console.log(user);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(signupDto: SignupDto): Promise<any> {
    if (signupDto.password !== signupDto.confirmPassword)
      throw new ValidationError();

    const hashedPassword = await this.encryptionService.encryptPassword(
      signupDto.password,
    );

    await this.usersService.create({
      email: signupDto.email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      role: signupDto.role,
    });
  }
}
