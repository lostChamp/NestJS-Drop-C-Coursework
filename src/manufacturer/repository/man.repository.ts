import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ManufacturerEntity } from "../entity/manufacturer.entity";
import { CreateManDto } from "../dto/create.man.dto";

@Injectable()
export class ManufacturerRepository {
  constructor(@InjectRepository(ManufacturerEntity) private readonly ManModel: Repository<ManufacturerEntity>) {
  }

  async getAllMans() {
    const man = await this.ManModel.find();
    return man;
  }

  async getManByValue(value: string|number) {
    const man = await this.ManModel.findOne({
      where: {
        name: value.toString()
      }
    })

    return man;
  }

  async getManById(id: number) {
    const man = await this.ManModel.findOne({
      where: {
        id: id
      }
    })
    return man;
  }

  async createMan(info: CreateManDto) {
    const newMan = await this.ManModel.create({
      ...info
    });
    await this.ManModel.save(newMan);
    return newMan;
  }

}