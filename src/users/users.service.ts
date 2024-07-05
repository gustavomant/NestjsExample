import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService){}

  async create(data: Prisma.UserCreateInput) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        id: data.id
      }
    });

    if (userExists) {
      throw new ConflictException("User already exists");
    } 

    const user = this.prisma.user.create({data});

    return user;
  }

  async findAll() {
    const user = await this.prisma.user.findMany();
    return user;
  }

  async findOne(email: string) {
    const user = await this.prisma.user.findUnique({where: {
      email: email
    }});

    if(user === undefined) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: data
    });
    
    return user; 
  }

  async remove(id: string) {
    return await this.prisma.user.delete({where: {
      id: id
    }});
  }
}
