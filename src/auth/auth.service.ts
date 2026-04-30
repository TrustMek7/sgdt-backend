import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/prisma/prisma.service';
import { LoginDto, CreateUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    // Obtener usuario de la BD
    // Nota: Debes ajustar esto según el esquema actual de tu BD
    // const user = await this.prisma.user.findUnique({ where: { email } });
    // if (user && (await bcrypt.compare(password, user.password))) {
    //   return user;
    // }
    return null;
  }

  async login(loginDto: LoginDto) {
    // const user = await this.validateUser(loginDto.email, loginDto.password);
    // if (!user) {
    //   throw new UnauthorizedException('Credenciales inválidas');
    // }

    const payload = { email: loginDto.email, sub: 'userId' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    // const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    // const user = await this.prisma.user.create({
    //   data: {
    //     email: createUserDto.email,
    //     password: hashedPassword,
    //     name: createUserDto.name,
    //   },
    // });
    // return { id: user.id, email: user.email };
    return { message: 'Usuario registrado exitosamente' };
  }
}
