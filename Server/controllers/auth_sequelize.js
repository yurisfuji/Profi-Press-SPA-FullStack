import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import {User, Group} from "../models/sequelize/index.js";

const getToken = id => jwt.sign( { _id: id, }, process.env.JWT_SECRET, { expiresIn: "30d", });

export const register = async (req, res) => {
    try{
        const { username, password } = req.body;
        const isUsed = await User.findOne({ where: { username: username }});
        if(isUsed) {
            return res.status(402).json({ //status 402
                message: "Это имя пользователя уже занято"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    
    
        const user = await User.create({
            username: username,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
            userRoles: [],            
        });
    
        const { passwordHash, ...userData } = user.toJSON();    

        return res.json({
            user: {...userData},
            token: getToken(user.id),
            message: 'Регистрация прошла успешно.'
        });
    } catch(err){
        console.log(err);
        res.status(500).json({ //500
            message: "Не удалось зарегистрироваться",
            //err: err
        });
    };
};

export const login = async (req, res) => {
    try{
        const user = await User.findOne({ include: Group, where: {username: req.body.username} });

        if(!user) {
            return res.status(404).json({  //404
                message: "Неверный логин или пароль",
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user.toJSON().passwordHash);
        if(!isValidPass) {
            return res.status(404).json({ //404
                message: "Неверный логин или пароль",
            });
        }

        const { passwordHash, ...userData } = user.toJSON();    

        return res.json({
            user: {...userData},
            token: getToken(user.id),
            message: 'Вы вошли в систему.'
        });
    } catch(err){
        console.log(err);
        res.status(500).json({ //500
            message: "Не удалось авторизоваться",        
        });    
    };
};

export const getMe = async (req, res) => {
    try{
        const user = await User.findOne({include: Group, where: {id: req.userId}});

        if(!user) {
            return res.status(404).json({ //404
                message: "Пользователь не найден"
            });
        }

        const { passwordHash, ...userData } = user.toJSON();    

        return res.json(userData);

    } catch(err) {
        console.log(err);
        res.status(500).json({ //500
            message: "Нет доступа",
        });
    };
};

