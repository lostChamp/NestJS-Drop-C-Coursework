import { Injectable } from '@nestjs/common';
import {CreateUserDto} from "./dto/create.user.dto";
import {UserRepository} from "./repository/user.repository";
import { RoleEntity } from "../role/entity/role.entity";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(info: CreateUserDto, roleInfo: object) {
        return this.userRepository.createUser(info, roleInfo);
    }

    async getUserByEmail(email: string) {
        return this.userRepository.getUserByEmail(email);
    }
}
