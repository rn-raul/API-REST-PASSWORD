export class PasswordMinError extends Error {
    constructor() {
        super("A senha deve conter no mínimo 6 caracteres");
    }
}