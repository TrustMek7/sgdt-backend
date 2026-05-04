import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  // Allow multiple origins via comma-separated CORS_ORIGIN or enable localhost:5173 for frontend dev
  const rawOrigins = process.env.CORS_ORIGIN || 'http://localhost:3001';
  const origins = rawOrigins.split(',').map((s) => s.trim()).filter(Boolean);
  if (!origins.includes('http://localhost:5173')) origins.push('http://localhost:5173');

  app.enableCors({
    origin: (origin, callback) => {
      // allow non-browser requests like curl (no origin)
      if (!origin) return callback(null, true);
      if (origins.indexOf(origin) !== -1) return callback(null, true);
      return callback(new Error('CORS policy: origin not allowed'), false);
    },
    credentials: true,
  });

  app.use('/uploads', express.static(join(process.cwd(), 'public/device-images')));

  // Validación global de DTOs
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // Prefijo global
  app.setGlobalPrefix('api');

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('SGDT API')
    .setDescription('Sistema de Gestión de Dispositivos y Telecomunicaciones')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('auth', 'Autenticación')
    .addTag('areas', 'Áreas')
    .addTag('devices', 'Dispositivos')
    .addTag('device-types', 'Tipos de Dispositivos')
    .addTag('offices', 'Oficinas')
    .addTag('reports', 'Reportes')
    .addTag('health', 'Estado de salud')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 SGDT Backend corriendo en http://localhost:${port}`);
  console.log(`📚 Documentación disponible en http://localhost:${port}/api-docs`);
}

bootstrap().catch((err) => {
  console.error('❌ Error al iniciar la aplicación:', err);
  process.exit(1);
});
