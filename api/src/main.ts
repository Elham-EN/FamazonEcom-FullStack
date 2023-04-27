import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

// Entry Point to nest application
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Making request from React server
  app.setGlobalPrefix('api'); // localhost:3000/api/product

  const config = new DocumentBuilder()
    .setTitle('FamazoneEcom API')
    .setDescription(
      'Provide all nesscessary endpoints to auth, register, get list of products, add new product and more',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('FamazoneEcom')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
