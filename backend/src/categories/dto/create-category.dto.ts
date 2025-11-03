import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { TransactionType } from '@prisma/client';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(TransactionType, {
    message: 'Type must be either EXPENSE or INCOME',
  })
  type: TransactionType;

  @IsString()
  @IsOptional()
  description?: string;
}
