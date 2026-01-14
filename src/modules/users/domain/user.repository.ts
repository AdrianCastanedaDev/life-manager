import { User, CreateUserInput, UpdateUserInput } from './user.entity';

export interface IUserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(data: CreateUserInput): Promise<User>;
    update(id: string, data: UpdateUserInput): Promise<User>;
    delete(id: string): Promise<void>;
}

export const USER_REPOSITORY = 'USER_REPOSITORY';
