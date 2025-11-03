import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@GetUser('id') userId: string, @Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(userId, dto);
  }

  @Get()
  findAll(@GetUser('id') userId: string) {
    return this.categoriesService.findAll(userId);
  }

  @Get(':id')
  findOne(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.categoriesService.findOne(userId, id);
  }

  @Patch(':id')
  update(
    @GetUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(userId, id, dto);
  }

  @Delete(':id')
  remove(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.categoriesService.remove(userId, id);
  }
}
