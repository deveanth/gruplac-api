import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class BrowserConfigService {
  async getBrowser() {
    const launchBrowser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      // executablePath: '/usr/bin/chromium-browser', para linux
      headless: 'new',
    });
    return launchBrowser;
  }
}
