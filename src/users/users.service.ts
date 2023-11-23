import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Schema/user.schema';
import { Model } from 'mongoose';
import { ActionResponse } from 'src/Shared/models/responses';
import * as bcrypt from 'bcrypt';
import { ActiveUserDto } from './dto/active-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { phrase, ...userData } = createUserDto;

      await this.userModel.create({
        ...userData,
        phrase: bcrypt.hashSync(phrase, 10),
      });
      return new ActionResponse({
        message: `User ${createUserDto.email} registered correctly`,
        content: true,
      });
    } catch (error) {
      throw new BadRequestException('User already exist');
    }
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  async findOne(id: string) {
    const user = await this.userModel
      .find({ _id: id, active: true })
      .select(['-__v', '-phrase']);
    if (user.length === 0) throw new BadRequestException("user don't exist");
    return user[0];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (user) {
      await this.userModel.findOneAndUpdate({ _id: id }, { ...updateUserDto });
    }
    return new ActionResponse({
      message: `The user ${user.name} ${user.lastName} has been edit`,
      content: true,
    });
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (user) {
      await this.userModel.findOneAndUpdate({ _id: id }, { active: false });
    }
    return new ActionResponse({
      message: `This action removes a ${user.name} ${user.lastName} user`,
      content: true,
    });
  }

  async activeUser(activeUser: ActiveUserDto) {
    const { email, phrase } = activeUser;

    const user = await this.userModel.findOne({ email: email });

    if (!user)
      throw new UnauthorizedException(
        'This user never existed. Please create one user',
      );
    if (!bcrypt.compareSync(phrase, user.phrase))
      throw new UnauthorizedException('Credentials are not valid ');

    await this.userModel.findOneAndUpdate({ email }, { active: true });

    return new ActionResponse({
      message: `Welcome again ${user.name} ${user.lastName}.`,
      content: true,
    });
  }
}
