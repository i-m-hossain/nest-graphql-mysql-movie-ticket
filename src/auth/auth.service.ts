import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import hashPassword from 'src/lib/hashPassword';
import * as bcrypt from 'bcrypt';

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
    const valid = await bcrypt.compare(password, user.password);
    if (user && valid) {
      return user;
    }
    return null;
  }
  login(user: User) {
    //before login user is retrieved from the context
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user: user,
    };
  }
  async signup(createUserInput: CreateUserInput) {
    //first check if the user already exists
    const user = await this.userRepository.findOne({
      where: { username: createUserInput.username },
    });
    if (user) {
      throw new Error('User already exists');
    }

    //hashing the password
    const password = await hashPassword(createUserInput.password);

    //saving to database
    const newUser = this.userRepository.create({
      ...createUserInput,
      password,
    });
    await this.userRepository.save(newUser);
    //graphql response
    return {
      access_token: this.jwtService.sign({
        username: newUser.username,
        sub: newUser.id,
      }),
      user: newUser,
    };
  }
}
