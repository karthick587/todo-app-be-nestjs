import { User } from './user.schema';
import { UserDto } from './response.user.dto';

export const userToDto = (user: User): UserDto => {
    return {
        _id: user._id.toString(), // Convert ObjectId to string if necessary
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt.toISOString()
    };
};
