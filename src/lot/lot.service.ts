import { Injectable } from '@nestjs/common';
import { WareRepository} from "./repository/ware.respository";

@Injectable()
export class LotService {

  constructor(private readonly wareService: WareRepository) {}

  async getAllWares() {
    const wares = this.wareService.getAllWare();
    return wares;
  }

}
