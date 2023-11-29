import { Injectable } from '@nestjs/common';
import { RoleRepository } from "./repository/role.entity";

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async getRoleByValue(value: string) {
    return this.roleRepository.getRoleByValue(value);
  }

  async getAllRoles() {
    const roles = await this.roleRepository.getAllRoles();
    return roles;
  }
}
