import { BadRequestException } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsInt, Max, Min } from 'class-validator';

export const toSortBy = (value: string) => {
  const sorts = value.split(',');
  return sorts.map((sortExpression) => {
    const splittedValue = sortExpression.split(':');
    const field = splittedValue[0];
    const direction = splittedValue[1];
    return new SortBy(field, direction);
  });
};

export class SortBy {
  field: string;
  direction: 'ASC' | 'DESC';

  constructor(field: string, direction: string) {
    if (direction !== 'ASC' && direction !== 'DESC') {
      throw new BadRequestException('Invalid direction');
    }

    this.field = field;
    this.direction = direction;
  }
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

  @Transform(({ value }) => toSortBy(value))
  @Type(() => SortBy)
  @IsArray({ message: 'SortBy is required' })
  readonly sortBy: SortBy[];

  get skip(): number {
    return (this.page - 1) * this.itemsPerPage;
  }
}
