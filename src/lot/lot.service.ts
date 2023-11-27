import { Injectable } from '@nestjs/common';
import { WareRepository} from "./repository/ware.respository";

@Injectable()
export class LotService {

  constructor(private readonly wareRepository: WareRepository) {}

  async getAllWares() {
    const wares = this.wareRepository.getAllWare();
    return wares;
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
