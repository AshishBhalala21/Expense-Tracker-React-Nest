import { IsNotEmpty, IsNumber, IsDateString, IsString, IsEnum, IsOptional } from 'class-validator';
import { TransactionType } from '@prisma/client';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsDateString()
  date: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
