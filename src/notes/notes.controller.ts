import {
  Controller,
  // Get,
  Post,
  Body,
  Patch,
  Param,
  // Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiBadRequestResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActionResponse } from 'src/Shared/models/responses';
import { ValidateMongoId } from 'src/Shared/Pipes/ValidationMongoId.pipe';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/Shared/utils/enums';
import { GetUserId } from 'src/Shared/decorators/get-user.decorator';
import { Types } from 'mongoose';

@Controller('notes')
@ApiTags('Notes')
@ApiBadRequestResponse({ type: ActionResponse })
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiOperation({ summary: 'Create a task' })
  @Post()
  @Auth(ValidRoles.user, ValidRoles.admin, ValidRoles.superUser)
  create(
    @GetUserId() userId: Types.ObjectId | undefined,
    @Body() createNoteDto: CreateNoteDto,
  ) {
    return this.notesService.create(userId, createNoteDto);
  }

  // @Get()
  // findAll() {
  //   return this.notesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.notesService.findOne(+id);
  // }

  @ApiOperation({ summary: 'Edit a task' })
  @Patch(':taskId')
  @Auth(ValidRoles.user, ValidRoles.admin, ValidRoles.superUser)
  update(
    @GetUserId() userId: Types.ObjectId | undefined,
    @Param('taskId', ValidateMongoId) taskId: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.update(taskId, userId, updateNoteDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.notesService.remove(+id);
  // }
}
