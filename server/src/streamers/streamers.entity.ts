import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Platform } from './dtos/add-streamer.dto.';

@Entity()
export class Streamer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  streamerName: string;

  @Column()
  platform: Platform;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  upvotes: number;

  @Column()
  downvotes: number;
}
