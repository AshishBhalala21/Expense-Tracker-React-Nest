import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getBaseRoute() {
    return {
      name: 'Expense Tracker API',
      version: '1.0.0',
      description: 'RESTful API for managing personal expenses and income',
      endpoints: {
        health: '/health',
      },
    };
  }

  @Get('health')
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        api: 'healthy',
        database: 'connected',
      },
    };
  }
}
