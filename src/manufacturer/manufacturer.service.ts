import { Injectable } from '@nestjs/common';
import { ManufacturerEntity } from "./entity/manufacturer.entity";
import { ManufacturerRepository } from "./repository/man.repository";
import { CreateManDto } from "./dto/create.man.dto";

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

  async getManByValue(value: string|number) {
    const man = await this.manRepository.getManByValue(value);
    return man;
  }

  async createMan(info: CreateManDto) {
    const man = this.manRepository.createMan(info);
    return man;
  }

  async updateMan(id: number, info: CreateManDto) {
    const man = await this.manRepository.updateMan(id, info);
    return man;
  }

  async deleteMan(id: number) {
    await this.manRepository.deleteMan(id);
  }

}
