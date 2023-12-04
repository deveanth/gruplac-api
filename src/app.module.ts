import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapeModule } from './scrape/scrape.module';
import { DataJsonModule } from './data-json/data-json.module';

@Module({
  imports: [ScrapeModule, DataJsonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
