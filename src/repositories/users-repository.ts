export interface UsersRepository {
    findByEmail(email: string): Promise<any>;
    create(data: { nome: string; email: string; password_hash: string }): Promise<any>;
}