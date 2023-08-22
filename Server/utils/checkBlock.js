import {User as UserModel} from "../models/sequelize/index.js";

export default async (req, res, next) => {
    try {
        console.log(req.userId)
        const user = await UserModel.findOne({ where: { id: req.userId } });
        console.log(user)

        if (user.isBlocked) {
            return res.status(404).json({ //404
                message: "Пользователь заблокирован"
            });
        }
        next();
    } catch (err) {
        return res.status(403).json({
            message: "Нет доступа"
        });
    };
};