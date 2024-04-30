import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello Nest!---${new Date(Date.now())}`;
  }
}
