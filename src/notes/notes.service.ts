import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Notes } from './Schema/notes.schema';
import { Model, Types, now } from 'mongoose';
import { User } from 'src/users/Schema/user.schema';
import { ActionResponse } from 'src/Shared/models/responses';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Notes.name)
    private readonly notesModel: Model<Notes>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(userId: Types.ObjectId, createNoteDto: CreateNoteDto) {
    //comente la session por que encontre una mejor manera pero esta sirve para hcer mas efcicientes distintas llamadas a la bd
    // const session = await this.notesModel.startSession();
    try {
      // session.startTransaction();

      await this.notesModel.create({ ...createNoteDto, idUser: userId });
      // await session.commitTransaction();
      // session.endSession();
      return new ActionResponse({
        content: true,
        message: 'Your Task has been saved',
      });
    } catch (error) {
      // await session.abortTransaction();
      // session.endSession();
      throw new InternalServerErrorException('Please contac the admin');
    }
  }

  // findAll() {
  //   return `This action returns all notes`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} note`;
  // }

  async update(
    id: string,
    userId: Types.ObjectId,
    updateNoteDto: UpdateNoteDto,
  ) {
    const task = await this.notesModel.findById(id);

    if (!task) {
      throw new BadRequestException('task not found');
    }
    if (!userId.equals(task.idUser)) {
      throw new BadRequestException('This task does not belong to this user');
    }

    await this.notesModel.findOneAndUpdate(
      { _id: id },
      { ...updateNoteDto, editedAt: now() },
    );
    return new ActionResponse({ content: true, message: 'Task updated' });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} note`;
  // }
}
