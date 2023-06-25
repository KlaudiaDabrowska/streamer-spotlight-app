import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StreamersModule } from './streamers/streamers.module';

@Module({
  imports: [StreamersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
