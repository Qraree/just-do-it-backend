import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { signInUserDto } from '../users/dto/signIn-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userDto: signInUserDto): Promise<any> {
    const user = await this.userService.findOneByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!user || !passwordEquals) {
      throw new UnauthorizedException({
        message: 'Некорректный email или пароль!',
      });
    }
    return this.generateToken(user);
  }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const candidate = await this.userService.findOneByEmail(
      createUserDto.email,
    );
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким Email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const saltOrRounds = 5;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    const user = await this.userService.create({
      ...createUserDto,
      password: hash,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { id: user.id, email: user.email };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
