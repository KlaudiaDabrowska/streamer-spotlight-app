import { Module } from '@nestjs/common';
import { StreamersController } from './streamers.controller';
import { StreamersService } from './streamers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Streamer } from './streamers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Streamer])],
  controllers: [StreamersController],
  providers: [StreamersService],
})
export class StreamersModule {}
