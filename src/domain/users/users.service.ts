import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async get(id: number): Promise<User | undefined> {
    return this.userModel.findById(id);
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email }).select('+password');
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const createdUser = new this.userModel(createUserDto);

    return await createdUser.save();
  }
}
