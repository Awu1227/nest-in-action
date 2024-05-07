import { Injectable } from '@nestjs/common';
import { getData } from './utils/index';
@Injectable()
export class AppService {
  async getHello() {
    return 'Hello Nest';
  }
}
