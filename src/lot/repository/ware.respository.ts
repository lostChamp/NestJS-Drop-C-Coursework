import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WareEntity } from "../entity/ware.entity";

@Injectable()
export class WareRepository {
  constructor(@InjectRepository(WareEntity) private readonly WareModel: Repository<WareEntity>) {
  }

  async getAllWare() {
    const lots = await this.WareModel.find({relations: ["man", "category"]});
    return lots;
  }

}