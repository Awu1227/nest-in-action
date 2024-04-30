import { Injectable } from '@nestjs/common';
import { getData } from './utils/index';
@Injectable()
export class AppService {
  async getHello() {
    const res = await getData();
    return res; //
  }
}
