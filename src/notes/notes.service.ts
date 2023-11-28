import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
// import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Notes } from './Schema/notes.schema';
import { Model } from 'mongoose';
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

  async create(userId: string, createNoteDto: CreateNoteDto) {
    const session = await this.notesModel.startSession();
    try {
      session.startTransaction();
      const user = await this.userModel.findById(userId);
      await this.notesModel.create({ ...createNoteDto, idUser: user._id });
      await session.commitTransaction();
      session.endSession();
      return new ActionResponse({
        content: true,
        message: 'Your Task has been saved',
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new InternalServerErrorException('Please contac the admin');
    }
  }

  // findAll() {
  //   return `This action returns all notes`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} note`;
  // }

  // update(id: number, updateNoteDto: UpdateNoteDto) {
  //   return `This action updates a #${id} note`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} note`;
  // }
}
