import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    // provides a set of utilities to work with JSON Web Tokens
    // (JWT) in a NestJS application. The JwtModule can then be
    // injected into your services (e.g., AuthService) to work
    // with JWTs
    JwtModule.registerAsync({
      useFactory: () => ({
        // The secret key used to sign and verify JWTs. In a
        // production environment, you should use a more secure
        // and unique secret key, preferably loaded from an
        // environment variable
        secret: 'secret',
        // The generated JWTs will expire in 3600 seconds (1 hour)
        // after being issued
        signOptions: { expiresIn: '3600s' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy],
})
export class AuthModule {}
