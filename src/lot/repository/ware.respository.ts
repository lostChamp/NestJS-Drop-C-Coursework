import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WareEntity } from "../entity/ware.entity";
import { CreateLotDto } from "../dto/create.lot.dto";

@Injectable()
export class WareRepository {
  constructor(@InjectRepository(WareEntity) private readonly WareModel: Repository<WareEntity>) {
  }

  async getAllWare() {
    const lots = await this.WareModel.find({relations: ["man", "category"]});
    return lots;
  }

  async createLot(info: CreateLotDto) {
    const category = info.category.toString();
    const man = info.man.toString();
    delete info.man;
    delete info.category;
    info.price = Number(info.price);
    info.quantity = Number(info.quantity);
    const lot = await this.WareModel.create({
      ...info,
      category: category,
      man: man,

    });
    await this.WareModel.save(lot);
    return lot;
  }

  async updateLot(id: number, info: CreateLotDto) {
    const lot = await this.WareModel.findOne({
      where: {
        id: id
      }
    });
    let flag = false;
    let image = "/images/noImage.jpg"
    if(lot.image !== image) {
      flag = true;
      image = lot.image;
    }
    Object.assign(lot, info);
    if(lot.image === "" && !flag) {
      lot.image = "/images/noImage.jpg"
    }else {
      lot.image = image;
    }
    await this.WareModel.save(lot);
  }

  async deleteLot(id: number) {
    const lot = await this.WareModel.findOne({
      where: {
        id: id
      }
    });
    await this.WareModel.remove(lot);
  }
  async getLotById(id: number) {
    const lot = await this.WareModel.findOne({
      relations: ["man", "category"],
      where: {
        id: id,
      }
    });

    return lot;
  }

}