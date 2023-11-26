import { Injectable } from '@nestjs/common';
import { WareRepository} from "./repository/ware.respository";

@Injectable()
export class LotService {

  constructor(private readonly wareService: WareRepository) {}

  async getAllWares() {
    const wares = this.wareService.getAllWare();
    return wares;
  }

  async getAllWareForUsers() {
    const lots = await this.wareService.getAllWare();
    return lots.filter((lot) => lot.quantity > 0);
  }

}
