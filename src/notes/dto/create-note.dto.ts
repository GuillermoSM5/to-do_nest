import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  description: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  active: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  favorite: boolean;
}
