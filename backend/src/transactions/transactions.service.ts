import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateTransactionDto) {
    // Verify category exists and belongs to user
    const category = await this.prisma.category.findFirst({
      where: {
        id: dto.categoryId,
        userId,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.prisma.transaction.create({
      data: {
        ...dto,
        userId,
      },
      include: {
        category: true,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.transaction.findMany({
      where: { userId },
      include: {
        category: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findOne(userId: string, id: string) {
    const transaction = await this.prisma.transaction.findFirst({
      where: { 
        id,
        userId,
      },
      include: {
        category: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }

  async update(userId: string, id: string, dto: UpdateTransactionDto) {
    if (dto.categoryId) {
      // Verify new category exists and belongs to user
      const category = await this.prisma.category.findFirst({
        where: {
          id: dto.categoryId,
          userId,
        },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }
    }

    await this.findOne(userId, id);

    return this.prisma.transaction.update({
      where: { id },
      data: dto,
      include: {
        category: true,
      },
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    
    return this.prisma.transaction.delete({
      where: { id },
    });
  }
}
