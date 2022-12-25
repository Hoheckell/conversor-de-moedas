import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { UserDto } from '../dto/user.dto';
import { UserUpdateDto } from '../dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signup(userdto: UserDto) {
    const user = await this.userRepository.create(userdto);
    user.password = bcrypt.hashSync(
      user.password,
      Number.parseInt(process.env.SALT),
    );
    return await this.userRepository.save(user);
  }
  async create(userdto: UserDto): Promise<User> {
    const user = await this.userRepository.create(userdto);
    return await this.userRepository.save(user);
  }

  async show(userId: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async list(): Promise<Array<User>> {
    return await this.userRepository.find();
  }

  async update(id: number, userdto: UserUpdateDto): Promise<void> {
    await this.userRepository.update({ id }, userdto);
  }

  async delete(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }

  async findOne(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }
}
