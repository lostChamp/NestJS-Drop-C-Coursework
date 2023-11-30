import { Injectable } from '@nestjs/common';
import { WareRepository} from "./repository/ware.respository";
import { CreateLotDto } from "./dto/create.lot.dto";
import { CategoryService } from "../category/category.service";
import { ManufacturerService } from "../manufacturer/manufacturer.service";

@Injectable()
export class LotService {

  constructor(private readonly wareRepository: WareRepository,
              private readonly categoryService: CategoryService,
              private readonly manService: ManufacturerService) {}

  async getAllWares() {
    const wares = this.wareRepository.getAllWare();
    return wares;
  }

  async getWareByValue(value: string) {
    const ware = await this.wareRepository.getWareByValue(value);
    return ware;
  }

  async createLot(info: CreateLotDto) {
    const lot = await this.wareRepository.createLot(info);
    return lot;
  }

  async updateLot(id: number, info: CreateLotDto) {
    info.category = await this.categoryService.getCategoryByValue(info.category);
    info.man = await this.manService.getManByValue(info.man);
    const lot = await this.wareRepository.updateLot(id, info);
    return lot;
  }

  async deleteLot(id: number) {
    await this.wareRepository.deleteLot(id)
  }

  async getAllWareForUsers() {
    const lots = await this.wareRepository.getAllWare();
    return lots.filter((lot) => lot.quantity > 0);
  }

  async getLotById(id: number) {
    const lot = await this.wareRepository.getLotById(id);
    return lot;
  }
}
