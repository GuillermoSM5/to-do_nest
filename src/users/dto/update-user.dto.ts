import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsString()
  @MinLength(3)
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @MinLength(3)
  @IsOptional()
  lastName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiPropertyOptional()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  role: string[];
}
