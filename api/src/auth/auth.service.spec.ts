import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { NewUserDTO } from '../user/dtos/new-user.dto';
import { ExistingUserDTO } from '../user/dtos/existing-user.dto';
import { UserDocument } from '../user/user.schema';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
            getUserDetails: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should return "Email taken!" if user already exists', async () => {
      const newUser: NewUserDTO = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };

      jest
        .spyOn(userService, 'findByEmail')
        .mockResolvedValueOnce({} as UserDocument);

      const result = await authService.register(newUser);
      expect(result).toEqual('Email taken!');
    });

    // Add more test cases for the 'register' method
  });

  describe('login', () => {
    it('should return null if the user is not valid', async () => {
      const existingUser: ExistingUserDTO = {
        email: 'test@example.com',
        password: 'password',
      };

      jest
        .spyOn(authService, 'validateUser' as keyof AuthService)
        .mockResolvedValueOnce(null);

      const result = await authService.login(existingUser);
      expect(result).toBeNull();
    });

    // Add more test cases for the 'login' method
  });

  // Add tests for other methods in AuthService
});
