import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import hashPassword from 'src/lib/hashPassword';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserInput: CreateUserInput): Promise<User> {
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
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  findOne(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: { username: username },
    });
  }
}
