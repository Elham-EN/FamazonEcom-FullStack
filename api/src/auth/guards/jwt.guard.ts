import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// The purpose of JwtGuard is to protect routes using the JWT-based
// authentication strategy. will use the JWT authentication strategy
// registered with Passport in your application.
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}

/**
 * Guards in NestJS are used to protect routes and control access to
 * specific parts of your application based on certain conditions, such
 * as user roles or authentication status. They determine whether a
 * request should be allowed to proceed or be denied. Guards are executed
 * before the request reaches the route handler (controller) and can be used
 * to implement features like authentication and authorization.
 */

/**
 * Passport provides a flexible and modular way to handle authentication
 * strategies, such as local (username and password), OAuth, JWT, or other
 * third-party authentication providers.
 *
 * Passport strategies are modular components that define how user authentication
 * should be performed. Each strategy encapsulates a specific authentication
 * mechanism, such as:
 *
 * Local strategy: Authenticates users using their email/username and password.
 *
 * OAuth strategies: Authenticate users via third-party OAuth providers like Google,
 * Facebook, or Twitter.
 *
 * JWT strategy: Authenticates users by verifying a JSON Web Token (JWT) included
 * in the request.
 *
 * The advantage of using strategies is that you can plug in different authentication
 * mechanisms into your application without changing the core logic. They make your
 * authentication system more flexible and maintainable.
 */
