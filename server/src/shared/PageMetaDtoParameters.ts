import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PageOptionsDto {
  @IsEnum(Order)
  readonly order: Order = Order.ASC;

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
