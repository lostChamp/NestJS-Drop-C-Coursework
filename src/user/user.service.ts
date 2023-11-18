import { Injectable } from '@nestjs/common';
import {CreateUserDto} from "./dto/create.user.dto";
import {UserRepository} from "./repository/user.repository";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(info: CreateUserDto) {
        return this.userRepository.createUser(info);
    }

    async getUserByEmail(email: string) {
        return this.userRepository.getUserByEmail(email);
    }
}
