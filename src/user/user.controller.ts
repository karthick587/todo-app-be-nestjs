import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './response.user.dto';
import { User } from './user.schema';
import { RequestUserDto } from './request.user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    create(@Body() todo: RequestUserDto): Promise<UserDto> {
        return this.userService.create(todo);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<UserDto[]> {
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    findOne(@Param("id") id: string): Promise<UserDto> {
        if (!id) {
            throw new HttpException('Error: ID is required', HttpStatus.NOT_FOUND);
        }
        return this.userService.findOne(id);
    }

    @Put()
    update(@Param("id") id: string, @Body() todo: Partial<User>): Promise<UserDto> {
        if (!id) {
            throw new HttpException('Error: ID is required', HttpStatus.NOT_FOUND);
        }
        return this.userService.update(id, todo)
    }

    @Delete(":id")
    delete(@Param("id") id: string): Promise<UserDto> {
        if (!id) {
            throw new HttpException('Error: ID is required', HttpStatus.NOT_FOUND);
        }
        return this.userService.delete(id);
    }

}
