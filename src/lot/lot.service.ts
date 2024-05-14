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

  async getWareByValue(values: string[]) {
    const ware = await this.wareRepository.getWareByValue(values);
    return ware;
  }

  async createLot(info: CreateLotDto) {
    const lot = await this.wareRepository.createLot(info);
    return lot;
  }

  async getAllWareForUsers() {
    const lots = await this.wareRepository.getAllWare();
    return lots.filter((lot) => lot.quantity > 0);
  }

  async getLotById(id: number) {
    const lot = await this.wareRepository.getLotById(id);
    return lot;
  }

  async decrementItemQuantity(id: number) {
    await this.wareRepository.decrementItemQuantity(id);
  }

  async editWare(id: number, info: object) {
    await this.wareRepository.editWare(id, info);
  }

}
