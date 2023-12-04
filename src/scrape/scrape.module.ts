import { Module } from '@nestjs/common';
import { BrowserConfigService } from './browser-config.service';
import { DataGenerateService } from './data-generate.service';
import { DataJsonModule } from '../data-json/data-json.module';

@Module({
  imports: [DataJsonModule],
  providers: [BrowserConfigService, DataGenerateService],
  exports: [BrowserConfigService, DataGenerateService],
})
export class ScrapeModule {}
