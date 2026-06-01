export class AuthenticationError extends Error {
    constructor() {
        super("E-mail ou senha incorretos");
    }
}