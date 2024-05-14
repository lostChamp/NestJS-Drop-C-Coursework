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
    const lots = await this.WareModel.find({relations: ["man", "category"], order: {
        id: "DESC"
      }});
    return lots;
  }

  async getWareByValue(values: string[]) {
    let wares = [];
    for(let item of values) {
      const ware = await this.WareModel.findOne({
        where: {
          item: item
        }
      });
      wares.push(ware);
    }
    return wares;
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
  async getLotById(id: number) {
    const lot = await this.WareModel.findOne({
      relations: ["man", "category"],
      where: {
        id: id,
      }
    });

    return lot;
  }

  async decrementItemQuantity(id: number) {
    const lot = await this.WareModel.findOne({
      where: {
        id: id,
      }
    });
    lot.quantity--;
    await this.WareModel.save(lot);
  }

  async incrementItemQuantity(id: number) {
    const lot = await this.WareModel.findOne({
      where: {
        id: id,
      }
    });
    lot.quantity++;
    await this.WareModel.save(lot);
  }
  async decrementArrayItemQuantity(items: string[]) {
    for(let item of items) {
      const lot = await this.WareModel.findOne({
        where: {
          item: item["item"],
        }
      });
      lot.quantity--;
      await this.WareModel.save(lot);
    }
  }

  async editWare(id: number, info: object) {
    const ware = await this.WareModel.findOne({
      where: {
        id: id,
      }
    });

    Object.assign(ware, info);

    await this.WareModel.save(ware);
  }
}