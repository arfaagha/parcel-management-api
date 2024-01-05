import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './utils/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
 
  //swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Parcels')
    .setDescription('The parcels API description')
    .setVersion('1.0')
    .addTag('parcel')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
 
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
