import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@GetUser('id') userId: string, @Body() dto: CreateTransactionDto) {
    return this.transactionsService.create(userId, dto);
  }

  @Get()
  findAll(@GetUser('id') userId: string) {
    return this.transactionsService.findAll(userId);
  }

  @Get(':id')
  findOne(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.transactionsService.findOne(userId, id);
  }

  @Patch(':id')
  update(
    @GetUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(userId, id, dto);
  }

  @Delete(':id')
  remove(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.transactionsService.remove(userId, id);
  }
}
