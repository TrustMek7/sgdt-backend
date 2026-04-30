import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    credentials: true,
  });

  // Validación global de DTOs
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

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
