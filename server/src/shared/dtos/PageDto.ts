import { IsArray } from 'class-validator';
import { PageOptionsDto } from './PageMetaDtoParameters';

export class PageDto<T> {
  @IsArray()
  readonly data: T[];

  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}

export class PageMetaDto {
  readonly page: number;
  readonly items: number;
  readonly total: number;

  constructor(pageOptions: PageOptionsDto, total: number) {
    this.page = pageOptions.page;
    this.items = pageOptions.itemsPerPage;
    this.total = total;
  }
}
