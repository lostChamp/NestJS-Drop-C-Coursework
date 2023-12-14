import {Repository} from "typeorm";
import {UserEntity} from "../entity/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "../dto/create.user.dto";
import { UserService } from "../user.service";
import { EditPasswordDto } from "../dto/edit.password.dto";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly UserModel: Repository<UserEntity>
    ) {
    }

    async createUser(info: CreateUserDto, roleInfo: object) {
        const user = this.UserModel.create({
            ...info,
            role: roleInfo["role"],
            created_at: new Date(),
        });
        const newUser = await this.UserModel.save(
            user
        );
        return newUser;
    }

    async getUserByEmail(email: string) {
        const user = await this.UserModel.findOne({
            where: {
                email: email,
            },
            relations: ["role"]
        });
        return user;
    }

    async getAllUsers() {
        const users = await this.UserModel.find({relations: ["role"], order: {
                id: "DESC"
            }});
        return users;
    }

    async getUserById(id: number) {
        const user = await this.UserModel.findOne({where: {
            id: id
        },
        relations: ["role"]});
        return user;
    }

    async updateUserById(user: UserEntity) {
        await this.UserModel.save(user);
    }

    async updatePassword(newInfo: EditPasswordDto, id: number) {
        const oldDataUser = await this.UserModel.findOne({
            where: {
                id: id
            },
            relations: ["role"]
        });

        oldDataUser.password = newInfo.password;
        console.log(oldDataUser);
        await this.UserModel.save(oldDataUser);
        return oldDataUser;
    }
}