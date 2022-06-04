import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserInput } from './dto/login-user-input';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
  login(user: User) {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user: user,
    };
  }
  async signup(createUserInput: CreateUserInput) {
    const user = await this.userRepository.findOne({
      where: { username: createUserInput.username },
    });
    if (user) {
      throw new Error('User already exists');
    }
    const newUser = this.userRepository.create(createUserInput);
    await this.userRepository.save(newUser);
    return {
      access_token: this.jwtService.sign({
        username: newUser.username,
        sub: newUser.id,
      }),
      user: newUser,
    };
  }
}
