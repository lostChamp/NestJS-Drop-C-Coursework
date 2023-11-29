import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "../entity/role.entity";
import { Repository } from "typeorm";

@Injectable()
export class RoleRepository {
  constructor(@InjectRepository(RoleEntity) private readonly RoleModel: Repository<RoleEntity>) {}

  async getRoleByValue(value: string) {
    const role = await this.RoleModel.findOneBy({value: value});
    return role
  }

  async getAllRoles() {
    const roles = await this.RoleModel.find();
    return roles;
  }
}