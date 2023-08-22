import {User as UserModel} from "../models/sequelize/index.js";

export default async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ where: { id: req.userId, isAdmin: true } });

        if (!user) {
            return res.status(404).json({ //404
                message: "Для этой операции требуются права администратора"
            });
        }
        next();
    } catch (err) {
        return res.status(403).json({
            message: "Нет доступа"
        });
    };
};