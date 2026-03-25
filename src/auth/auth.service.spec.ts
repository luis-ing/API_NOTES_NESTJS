import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
    let service: AuthService;

    const mockUsersService = {
        findByEmail: jest.fn(),
    };

    const mockJwtService = {
        sign: jest.fn().mockReturnValue('mockToken'),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UsersService, useValue: mockUsersService },
                { provide: JwtService, useValue: mockJwtService },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('inicio de sesión exitoso', async () => {
        const mockUser = {
            id: 1,
            mail: 'test@test.com',
            pass: await bcrypt.hash('123456', 10),
        };

        mockUsersService.findByEmail.mockResolvedValue(mockUser);

        const result = await service.login('test@test.com', '123456');

        expect(result).toHaveProperty('accessToken');
        expect(result).toHaveProperty('refreshToken');
        expect(mockJwtService.sign).toHaveBeenCalled();
    });

    it('inicio de sesión fallido - usuario no encontrado', async () => {
        mockUsersService.findByEmail.mockResolvedValue(null);

        await expect(service.login('test@test.com', '123456')).rejects.toThrow();
    });

    it('inicio de sesión fallido - contraseña inválida', async () => {
        const mockUser = {
            id: 1,
            mail: 'test@test.com',
            pass: await bcrypt.hash('correct', 10),
        };

        mockUsersService.findByEmail.mockResolvedValue(mockUser);

        await expect(service.login('test@test.com', 'wrong')).rejects.toThrow();
    });
});
