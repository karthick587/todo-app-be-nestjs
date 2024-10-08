import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './response.user.dto';
import { userToDto } from './user.mapper';
import { RequestUserDto } from './request.user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async create(req: RequestUserDto): Promise<UserDto> {
        const newUser = new this.userModel({ ...req, createdAt:new Date() });
        await newUser.save();
        return userToDto(newUser);

    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email: email }).exec();
        return user;
    }

    async findAll(): Promise<UserDto[]> {
        const users = await this.userModel.find({}).exec();
        return users.map(userToDto);
    }

    async findOne(id: string): Promise<UserDto> {
        const user = await this.userModel.findOne({ _id: id }).exec();
        return userToDto(user);
    }

    async update(id: string, todo: Partial<User>): Promise<UserDto> {
        const user = await this.userModel.findByIdAndUpdate(id, todo, { new: true }).exec();
        return userToDto(user);
    }

    async delete(id: string): Promise<UserDto> {
        const user = await this.userModel.findByIdAndDelete(id).exec();
        return userToDto(user);
    }

}
