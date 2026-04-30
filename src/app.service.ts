import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'API SGDT - NestJS ✨';
  }

  getStatus() {
    return {
      status: 'online',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  }
}
