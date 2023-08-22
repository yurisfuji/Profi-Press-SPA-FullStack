import { body } from "express-validator"

export const registerValidation = [
    body("username", "Укажите имя (минимум 3 символа)").isLength({ min: 3 }).isString(),    
    body("password", "Пароль должен быть минимум 6 символов").isLength({ min: 6 }).isString(),
    body("avatarUrl", "Неверная ссылка на аватарку").optional().isURL(),
];


