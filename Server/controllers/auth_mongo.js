import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import {UserModel, UserRoleModel} from "../models/mongo/index.js";

export const register = async (req, res) => {
    try{

        const { userName, password } = req.body;
        const isUsed = await UserModel.findOne({ userName });
        if(isUsed) {
            return res.status(402).json({
                message: "Это имя пользователя уже занято"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    
    
        const doc = new UserModel({
            userName: userName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
            userRoles: [],            
        });
    
        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            }, 
            "randomKey",
            {
                expiresIn: "30d",
            },
          );
    
        const { passwordHash, ...userData } = user._doc;    

        return res.json({
            ...userData,
            token,
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "Не удалось зарегистрироваться",
            //err: err
        });
    };
};

export const login = async (req, res) => {
    try{
        const user = await UserModel.findOne({ userName: req.body.userName });

        if(!user) {
            return res.status(404).json({
                message: "Пользователь не найден",
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if(!isValidPass) {
            return res.status(404).json({
                message: "Неверный логин или пароль",
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            }, 
            process.env.JWT_SECRET,
            {
                expiresIn: "30d",
            },
          );
    
        const { passwordHash, ...userData } = user._doc;    

        return res.json({
            ...userData,
            token,
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "Не удалось авторизоваться",        
        });    
    };
};

export const getMe = async (req, res) => {
    try{
        const user = await UserModel.findById(req.userId);

        if(!user) {
            return res.status(404).json({
                message: "Пользователь не найден"
            });
        }

        const { passwordHash, ...userData } = user._doc;    

        return res.json(userData);

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Нет доступа",
        });
    };
};

export const updateUserRoles = async (req, res) => {
    try{

        const userRoles = req.body.userRoles;
        const user = await UserModel.findByIdAndUpdate(req.userId, {userRoles: userRoles}, {returnDocument: "after"}).populate("userRoles").exec();

        if(!user) {
            return res.status(404).json({
                message: "Пользователь не найден"
            });
        }

        const { passwordHash, ...userData } = user._doc;    

        return res.json(userData);

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Нет доступа",
        });
    };
}