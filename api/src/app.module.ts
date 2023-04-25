import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

// Base Module
@Module({
  // Import other modules here
  imports: [
    // Connect to our database
    MongooseModule.forRoot('mongodb://localhost:27017/amazon'),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
