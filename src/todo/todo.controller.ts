import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './todo.dto';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Post()

    create(@Body() todo: TodoDto) {
        return this.todoService.create(todo);
    }

    @Get()
    findAll() {
        return this.todoService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        if (!id) {
            throw new HttpException('Error: ID is required', HttpStatus.NOT_FOUND);
        }
        return this.todoService.findOne(id);
    }

    @Put()
    update(@Param("id") id: string, @Body() todo: Partial<TodoDto>) {
        if (!id) {
            throw new HttpException('Error: ID is required', HttpStatus.NOT_FOUND);
        }
        return this.todoService.update(id, todo)
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        if (!id) {
            throw new HttpException('Error: ID is required', HttpStatus.NOT_FOUND);
        }
        return this.todoService.delete(id);
    }

}
