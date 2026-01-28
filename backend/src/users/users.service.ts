import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(email: string, password: string){
    console.log('Creating user with email:', email);
    return this.prisma.user.create({
      data: {
        email,
        passwordHash: password,
      },
    });
  }

}