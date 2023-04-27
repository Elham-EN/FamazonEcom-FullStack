import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// The purpose of this class is to configure and implement the JWT-based
// authentication strategy for your application. It ensures that only users
// with a valid JWT can access protected routes.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // tells Passport to expect and extract the JWT from the Authorization
      // header as a Bearer token. When the request is received by the server,
      // Passport will look for the Authorization header, extract the token, and
      // use it to authenticate the client based on the JWT strategy configuration.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // sets the secret key used to verify the JWT signature.
      secretOrKey: 'secret',
    });
  }

  // called by Passport after the JWT is successfully decoded and verified. The
  // payload parameter contains the decoded JWT payload. The method returns an object
  // containing the user's data, which will be attached to the user property of the
  // request object (req.user) in the controllers and guards
  async validate(payload: any) {
    return { ...payload.user };
  }
}
