import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserInput } from './dto/login-user-input';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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
  async login(loginUserInput: LoginUserInput): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username: loginUserInput.username },
    });
    return {
      access_token: 'jwt',
      user: user,
    };
  }
}
