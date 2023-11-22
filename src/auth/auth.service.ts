import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/Schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const { email, phrase } = createAuthDto;
    const user = await this.userModel
      .findOne({ email: email })
      .select(['-__v']);

    if (!user) throw new UnauthorizedException('Credentials are not valid ');
    if (!bcrypt.compareSync(phrase, user.phrase))
      throw new UnauthorizedException('Credentials are not valid ');

    //TO-DO return jwt
    return {
      user,
      token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      }),
    };
  }
}
