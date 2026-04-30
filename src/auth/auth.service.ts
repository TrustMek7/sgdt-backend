import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/prisma/prisma.service';
import { LoginDto, CreateUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private readonly SUPERUSER_EMAIL = 'admin@sgdt.local';
  private readonly SUPERUSER_PASSWORD = 'Admin123!@#';

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
    this.initializeSuperuser();
  }

  async initializeSuperuser() {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: this.SUPERUSER_EMAIL },
      });

      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(this.SUPERUSER_PASSWORD, 10);
        await this.prisma.user.create({
          data: {
            email: this.SUPERUSER_EMAIL,
            password: hashedPassword,
            name: 'Administrador',
            role: 'superuser',
          },
        });
        console.log('✓ Superuser creado: admin@sgdt.local / Admin123!@#');
      }
    } catch (error) {
      console.error('Error al crear superuser:', error);
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
    
    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new UnauthorizedException('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        name: createUserDto.name,
        role: 'user',
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
