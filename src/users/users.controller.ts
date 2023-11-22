import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ActionResponse } from 'src/Shared/models/responses';
// import { Auth } from 'src/auth/decorators/auth.decorator';
// import { ValidRoles } from 'src/Shared/utils/enums';

@Controller('users')
@ApiTags('Users')
@ApiBadRequestResponse({ type: ActionResponse })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @Auth(ValidRoles.admin)
  @ApiCreatedResponse({
    type: ActionResponse,
  })
  @ApiOperation({ summary: 'Creates new user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
