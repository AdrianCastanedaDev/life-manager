import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository, USER_REPOSITORY, User, CreateUserInput } from '../domain';
import { DuplicateEntityException } from '../../../common/exceptions';

@Injectable()
export class UsersService {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
    ) { }

    async findById(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }

    async create(data: CreateUserInput): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new DuplicateEntityException('User', 'email');
        }
        return this.userRepository.create(data);
    }
}
