import { Type } from 'class-transformer';
import { IsEnum, IsInt, Max, Min } from 'class-validator';
import { Streamer } from 'src/streamers/streamers.entity';

interface Order<T> {
  field: keyof T;
  direction: 'ASC' | 'DESC';
  // "upvoes:ASC"
}

export class PageOptionsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  readonly itemsPerPage: number = 10;

  get skip(): number {
    return (this.page - 1) * this.itemsPerPage;
  }
}

export class SortablePageOptionsDto<T> extends PageOptionsDto {
  readonly orders: Order<T>[];
}
