import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { IUserRepository, User, CreateUserInput, UpdateUserInput } from '../domain';
import { hashPassword } from '../../../common/utils/hash.util';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async create(data: CreateUserInput): Promise<User> {
        const hashedPassword = await hashPassword(data.password);
        return this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
        });
    }

    async update(id: string, data: UpdateUserInput): Promise<User> {
        const updateData = { ...data };
        if (data.password) {
            updateData.password = await hashPassword(data.password);
        }
        return this.prisma.user.update({
            where: { id },
            data: updateData,
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({ where: { id } });
    }
}
