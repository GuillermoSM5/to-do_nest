import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notes } from './Schema/notes.schema';
import { UserSchema } from 'src/users/Schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notes.name, schema: UserSchema }]),
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
