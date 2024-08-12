import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/core/guards/local-auth.guard';
import { SignupDto } from 'src/domain/users/dtos/signup.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { Role } from 'src/core/enums/role.enum';
import { RolesGuard } from 'src/core/guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/signup')
  async signup(@Body() signupDto: SignupDto) {
    return await this.authService.signup(signupDto);
  }

  @Roles(Role.NGO_MEMBER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
