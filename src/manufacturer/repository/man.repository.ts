import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ManufacturerEntity } from "../entity/manufacturer.entity";

@Injectable()
export class ManufacturerRepository {
  constructor(@InjectRepository(ManufacturerEntity) private readonly ManModel: Repository<ManufacturerEntity>) {
  }

  async getAllMans() {
    const man = await this.ManModel.find();
    return man;
  }
}