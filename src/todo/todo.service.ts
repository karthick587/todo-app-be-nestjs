import { Injectable } from '@nestjs/common';
import { Todo, TodoDocument } from './todo.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TodoDto } from './todo.dto';

@Injectable()
export class TodoService {
    constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) { }

    async create(todo: TodoDto): Promise<Todo> {
        const newTodo = new this.todoModel(todo);
        return newTodo.save();
    }

    async findAll(): Promise<Todo[]> {
        return this.todoModel.find({}).exec();
    }

    async findOne(id: string): Promise<Todo> {
        return this.todoModel.findOne({ _id: id }).exec();
    }

    async update(id: string, todo: Partial<TodoDto>): Promise<Todo> {
        return this.todoModel.findByIdAndUpdate(id, todo, { new: true }).exec();
    }

    async delete(id: string): Promise<Todo> {
        return this.todoModel.findByIdAndDelete(id).exec();
    }

}
