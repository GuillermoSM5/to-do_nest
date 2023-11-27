import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class LoginResponseInterface {
  @ApiProperty()
  _id: Types.ObjectId;
  @ApiProperty()
  name: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  role: string[];
  @ApiProperty()
  active: boolean;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  token: string;
}
