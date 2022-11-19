"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterService = void 0;
class RegisterService {
    create(register) {
        const requiredFields = ['username', 'password'];
        for (const field of requiredFields) {
            if (!register[field]) {
                return { error: `O campo "${field}" é obrigatório` };
            }
        }
    }
}
exports.RegisterService = RegisterService;
