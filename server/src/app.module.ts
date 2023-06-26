import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamersModule } from './streamers/streamers.module';

@Module({
  imports: [
    StreamersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: true,
      entities: ['**/*.entity.js'],
    }),
  ],
})
export class AppModule {}
