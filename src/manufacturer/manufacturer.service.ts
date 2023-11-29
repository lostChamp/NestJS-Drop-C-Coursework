import { Injectable } from '@nestjs/common';
import { ManufacturerEntity } from "./entity/manufacturer.entity";
import { ManufacturerRepository } from "./repository/man.repository";

@Injectable()
export class ManufacturerService {

  constructor(private readonly manRepository: ManufacturerRepository) {}

  async getAllMans() {
    const mans = await this.manRepository.getAllMans();
    return mans;
  }

  async getManById(id: number) {
    const man = await this.manRepository.getManById(id);
    return man;
  }

}
