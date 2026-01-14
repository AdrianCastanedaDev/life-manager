export interface User {
    id: string;
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateUserInput = Pick<User, 'email' | 'name' | 'password'>;
export type UpdateUserInput = Partial<Pick<User, 'name' | 'password'>>;
