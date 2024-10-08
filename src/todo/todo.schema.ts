import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    goal: string;

    @Prop()
    autoSync: boolean;

    @Prop({ type: Date, required: true })
    nextSync: Date;

    @Prop()
    createdBy: String;

    @Prop({ type: Date })
    createdAt: Date;

    @Prop()
    updatedBy: String;

    @Prop({ type: Date })
    updatedAt: Date;

}

export const TodoSchema = SchemaFactory.createForClass(Todo);
