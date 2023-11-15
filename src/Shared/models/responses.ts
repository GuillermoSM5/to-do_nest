import { ApiProperty } from '@nestjs/swagger';

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
