import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Platform } from './dtos/add-streamer.dto.';

@Entity()
export class Streamer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'streamer_name' })
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
