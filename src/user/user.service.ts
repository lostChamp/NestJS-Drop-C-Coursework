import { Injectable } from "@nestjs/common";
import {CreateUserDto} from "./dto/create.user.dto";
import {UserRepository} from "./repository/user.repository";
import { EditUserDto } from "./dto/edit.user.dto";
import * as bcrypt from "bcryptjs";
import { EditPasswordDto } from "./dto/edit.password.dto";


@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(info: CreateUserDto, roleInfo: object) {
        return this.userRepository.createUser(info, roleInfo);
    }

    async getUserByEmail(email: string) {
        return this.userRepository.getUserByEmail(email);
    }

    async getAllUsers() {
        return this.userRepository.getAllUsers();
    }

    async getUserById(id: number) {
        const user = await this.userRepository.getUserById(id);
        return user;
    }

    async updateUserById(id: number, newInfo: EditUserDto) {
        const user = await this.userRepository.getUserById(id);
        if(user.email === newInfo.email) {
            Object.assign(user, newInfo);
            await this.userRepository.updateUserById(user);
            return user;
        }else {
            const otherUser = await this.userRepository.getUserByEmail(newInfo.email);
            Object.assign(user, newInfo);
            if(!otherUser) {
                await this.userRepository.updateUserById(user);
                return user;
            }
        }
        return user;

    }

    async updatePassword(newInfo: EditPasswordDto, id: number) {
        newInfo.password = await bcrypt.hash(newInfo.password, 5);
        const user = await this.userRepository.updatePassword(newInfo, id)
        return user;
    }
}
