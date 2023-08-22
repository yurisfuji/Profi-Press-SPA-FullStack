import bcrypt from "bcrypt";
import { Op } from 'sequelize'
import { User, Group } from "../models/sequelize/index.js";

const getAllUsersOrderId = async () => {
    return await User.findAll({
        include: [{
            model: Group,
            required: false,
            attributes: ['id', 'name', 'avatarUrl', 'createdAt', 'updatedAt'],
            through: { attributes: [] }
        }],
            attributes: { exclude: ['passwordHash'] },
        order: [
            ['id', 'ASC'],
        ],            
    });
}

const getAllUserGroupsOrderId = async () => {
    return await Group.findAll({
        include: [{
            model: User,
            required: false,
            attributes: ['id', 'username'],
            through: { attributes: [] }
        }],
        order: [
            ['id', 'ASC'],
        ],            
    });
}

export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsersOrderId()

        return res.json({
            users: users,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ //500
            message: "Не удалось получить список пользователей",
        });
    };
};

export const updateUser = async (req, res) => {
    try {
        let updatedData = {};
        if (req.body?.username) updatedData.username = req.body?.username;
        if (req.body?.avatarUrl) updatedData.avatarUrl = req.body?.avatarUrl;
        if (req.body?.isAdmin != undefined) updatedData.isAdmin = req.body?.isAdmin;
        if (req.body?.isBlocked != undefined) updatedData.isBlocked = req.body?.isBlocked;

        // изменяем хэш-пароля, если он не пустой
        if (req.body?.password) {
            const salt = await bcrypt.genSalt(10);
            updatedData.passwordHash = await bcrypt.hash(req.body.password, salt);
        }
        // получаем список групп, в которых состоит пользователь
        const groups = await Group.findAll({ where: { id: (req.body?.groups || []) } })
        let user = await User.findByPk(req.params.id)
        await user.setGroups(groups)
        await user.update(updatedData)
        
        //получаем обновленные данные по всем связанным таблицам для отправки ответа                        
        const users = await getAllUsersOrderId()

        return res.json({
            users: users,
            message: "Информация о пользователе успешно сохранена"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ //500
            message: "Не удалось сохранить данные",
        });
    };
};

export const removeUser = async (req, res) => {
    try {

        await User.destroy({ where: { id: req.params.id } })
        
        //получаем обновленные данные по всем связанным таблицам для отправки ответа                        
        const users = await getAllUsersOrderId()

        return res.json({
            users: users,
            message: "Информация о пользователе успешно удалена"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ //500
            message: "Не удалось удалить данные",
        });
    };
};

export const addUser = async (req, res) => {
    try{
        let updatedData = {};
        updatedData.username = req.body?.username;
        const salt = await bcrypt.genSalt(10);
        updatedData.passwordHash = await bcrypt.hash(req.body?.password || "123456", salt);
        if (req.body?.avatarUrl) updatedData.avatarUrl = req.body?.avatarUrl;
        updatedData.isAdmin = req.body?.isAdmin;
        updatedData.isBlocked = req.body?.isBlocked;        

        const user = await User.create(updatedData)

        // получаем список групп, в которых состоит пользователь
        const groups = await Group.findAll({ where: { id: (req.body?.groups || []) } })
        await user.setGroups(groups)
        
        //получаем обновленные данные по всем связанным таблицам для отправки ответа                        
        const users = await getAllUsersOrderId()        

        return res.json({
            users: users,
            message: 'Регистрация прошла успешно.'
        });
    } catch(err){
        console.log(err.errors[0].message);
        res.status(500).json({ //500
            message: `Не удалось добавить пользователя: [${err.errors[0].message}]`,
            //err: err
        })
    };
};

export const getUserGroups = async (req, res) => {
    try{
        const groups = await getAllUserGroupsOrderId()     

        return res.json({
            groups,
        });
    } catch(err){
        console.log(err);
        res.status(500).json({ //500
            message: "Не удалось получить группы пользователей",        
        });    
    };
};

export const removeGroup = async (req, res) => {
    try {

        await Group.destroy({ where: { id: req.params.id } })
        
        //получаем обновленные данные по всем связанным таблицам для отправки ответа                        
        const groups = await getAllUserGroupsOrderId()

        return res.json({
            groups: groups,
            message: "Информация о группе успешно удалена"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ //500
            message: "Не удалось удалить данные",
        });
    };
};

export const addGroup = async (req, res) => {
    try{
        let groupData = {};
        groupData.name = req.body?.name;
        groupData.alias = req.body?.alias;
        if (req.body?.avatarUrl) groupData.avatarUrl = req.body?.avatarUrl;   

        await Group.create(groupData)

        //получаем обновленные данные по всем связанным таблицам для отправки ответа                        
        const groups = await getAllUserGroupsOrderId()        

        return res.json({
            groups: groups,
            message: 'Группа добавлена в базу.'
        });
    } catch(err){
        console.log(err);
        return res.status(500).json({ //500
            message: "Не удалось добавить группу",
            errors: err.errors
        });
    };
};

export const updateGroup = async (req, res) => {
    try {
        let updatedData = {};
        if (req.body?.name) updatedData.name = req.body?.name;
        if (req.body?.avatarUrl) updatedData.avatarUrl = req.body?.avatarUrl;
        if (req.body?.alias) updatedData.alias = req.body?.alias;

        // получаем список групп, в которых состоит пользователь
        let group = await Group.findByPk(req.params.id)
        await group.update(updatedData)
        
        //получаем обновленные данные по всем связанным таблицам для отправки ответа                        
        const groups = await getAllUserGroupsOrderId()    

        return res.json({
            groups: groups,
            message: "Информация о группе успешно сохранена"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ //500
            message: "Не удалось сохранить данные",
        });
    };
};