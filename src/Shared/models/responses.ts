import { ApiProperty } from '@nestjs/swagger';
import { LoginResponseInterface } from '../Interfaces/LoginResponseInterface.interface';

export interface BaseResponse<T> {
  message: string;
  content: T;
}

export class ActionResponse implements BaseResponse<boolean> {
  constructor({ message, content }: ActionResponse) {
    this.content = content;
    this.message = message;
  }

  @ApiProperty()
  message: string;
  @ApiProperty()
  content: boolean;
}

export class LoginResponse implements BaseResponse<LoginResponseInterface> {
  constructor({ message, content }: LoginResponse) {
    this.content = content;
    this.message = message;
  }

  @ApiProperty()
  message: string;
  @ApiProperty()
  content: LoginResponseInterface;
}
