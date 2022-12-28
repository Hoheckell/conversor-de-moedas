import { Controller, Get, HttpCode, Render, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Router, Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('routes')
  root(@Req() req: Request) {
    const router = req.app._router as Router;
    return {
      routes: router.stack
        .map((layer) => {
          if (layer.route) {
            const path = layer.route?.path;
            const method = layer.route?.stack[0].method;
            return `${method.toUpperCase()} ${path}`;
          }
        })
        .filter((item) => item !== undefined),
    };
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ description: 'Instructions' })
  @ApiResponse({ description: 'Instructions View' })
  @Render('index')
  async index() {
    return { message: 'Hello world!' };
  }
}
