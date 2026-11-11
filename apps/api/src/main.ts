import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('FIREWALL-Engine');
  const app = await NestFactory.create(AppModule);

  // Security Headers
  app.use(
    helmet({
      contentSecurityPolicy: false, // Swagger support
      crossOriginEmbedderPolicy: false,
    })
  );

  // CORS Configuration
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    })
  );

  // OpenAPI Swagger Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('FIREWALL — Enterprise Cybersecurity API')
    .setDescription(
      'REST & Real-time Telemetry API for the 12-in-1 Cybersecurity Ecosystem. Compliant with SIS Cyber Fortress architecture.'
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.API_PORT || process.env.PORT || 4000;
  await app.listen(port);

  logger.log(`=======================================================`);
  logger.log(`🛡️  FIREWALL — Your Digital World, Protected.`);
  logger.log(`🚀  12-in-1 Enterprise Cybersecurity Ecosystem Online`);
  logger.log(`📡  API Server listening on: http://localhost:${port}`);
  logger.log(`📚  Swagger Documentation:   http://localhost:${port}/api/docs`);
  logger.log(`⚡  Real-time Gateway:        ws://localhost:${port}`);
  logger.log(`=======================================================`);
}

bootstrap();
