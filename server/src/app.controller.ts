import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    console.log(111);
    return this.appService.getHello();
  }
  @Get('list')
  async universityList() {
    return this.appService.getUniversityData();
  }
}
