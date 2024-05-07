import { Injectable } from '@nestjs/common';
import { getData } from './utils/index';
import puppeteer from 'puppeteer';

let cache = null;
@Injectable()
export class AppService {
  async getHello() {
    return 'Hello Nest';
  }
  async getUniversityData() {
    if (cache) {
      return cache;
    }

    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: {
        width: 0,
        height: 0,
      },
    });

    const page = await browser.newPage();

    await page.goto('https://www.icourse163.org/university/view/all.htm');

    await page.waitForSelector('.u-usitys');

    const universityList = await page.$eval('.u-usitys', (el) => {
      return [...el.querySelectorAll('.u-usity')].map((item) => {
        return {
          name: item.querySelector('img').alt,
          img: item.querySelector('img').src,
          link: item.getAttribute('href'),
        };
      });
    });

    await browser.close();

    cache = universityList;

    return universityList;
  }
}
