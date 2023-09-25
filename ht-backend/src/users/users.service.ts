import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  usersCount() {
    try {
      return this.usersRepository.count();
    } catch (error) {
      throw error;
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userNameExists(createUserDto.username);
      if (user) {
        throw new ForbiddenException('Username already exists');
      }
      return await this.usersRepository.save(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.usersRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async usernameAvailable(username: string) {
    const count = await this.usersRepository.findOne({ where: { username } });
    return !count;
  }

  private async userNameExists(username: string) {
    return await this.usersRepository.findOneBy({ username });
  }

  async findOne(username: string) {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException(`Username not found!`);
    }
    return user;
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    try {
      await this.findOne(username);
      await this.usersRepository.update({ username }, updateUserDto);
      return this.usersRepository.findOne({ where: { username } });
    } catch (error) {
      throw error;
    }
  }

  async remove(username: string) {
    try {
      const user = await this.findOne(username);
      this.usersRepository.delete({ username });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
