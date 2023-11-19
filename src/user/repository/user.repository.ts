import {Repository} from "typeorm";
import {UserEntity} from "../entity/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "../dto/create.user.dto";

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
}