import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async findAll() {
    return await this.userModel.findAll();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({
      where: {
        email: email,
      },
    });
  }

  async findOne(id: number) {
    return await this.userModel.findOne({
      where: {
        id: id,
      },
    });
  }

  async remove(id: number) {
    return await this.userModel.destroy({
      where: {
        id: id,
      },
    });
  }
}
