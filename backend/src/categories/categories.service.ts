import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.category.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(userId: string, id: string) {
    const category = await this.prisma.category.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(userId: string, id: string, dto: UpdateCategoryDto) {
    await this.findOne(userId, id);

    return this.prisma.category.update({
      where: { id },
      data: dto,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
