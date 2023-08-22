import fs from 'fs'
import Sequelize from "sequelize"
import { Op } from 'sequelize'
import { User, Group, CalcRequest, RequestVariant } from '../../models/sequelize/index.js'
import bcrypt from 'bcrypt'

export function getSequelizeInstance(options) {
    switch(options.keyDB) {
        case 'SQLLITE':
            // создаем файл базы данных SQLLITE, если его не существует
            if (!fs.existsSync(options.DB_NAME)) {
                fs.writeFileSync(options.DB_NAME, '');
            }
            return new Sequelize({
                dialect: 'sqlite',
                storage: options.DB_NAME
              });
        case 'MSSQL':
            return new Sequelize(options.DB_NAME, 
                options.DB_USER, options.DB_PASSWORD, {
                host: options.DB_SERVER,
                dialect: 'mssql',
                define: {timestamps: false},
                // другие опции
                dialectOptions: {
                    options: {
                      encrypt: false,
                      tdsVersion: "7_1", // SQL SERVER 2000 need this
                    },    
                }    
              });            
    }
}

export async function getUsers(db, filter = null) {

    if(filter) {

    } else{
        await User.findAll({ include: Group }).then( users =>
        users.map(user => {
            const userJSON = user.toJSON();
            console.log(userJSON.username, userJSON.groups.map(group  => group.name) );
        }
        ))
        //console.log(users);
    }
}

export async function getPCRs(db, filter = null) {

    if(filter) {

    } else{
        await CalcRequest.findAll({ include: RequestVariant,  where: {
            code: { [Op.like]: `23-06%` } 
         }}).then( reqs =>
        reqs.map(req => {
            const reqJSON = req.toJSON();
            console.log(reqJSON.code, reqJSON.createdAt, reqJSON.requestvariants.map(v  => v.number) );
        }
        ))
    }
}

export async function addNewUser() {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('qwerty', salt);  
    ///*          
    await Group.bulkCreate([
        { name: 'Технологи', alias: "techno" },
        { name: 'Экономисты', alias: "econom" }, 
        { name: 'Договорной', alias: "contra" }
    ])
    //*/
    await Group.findAll({where: {name: ['Технолог','Договорной']} })   
    .then(
        roles => {
            User.create(
                { username: 'qwerty', isAdmin: true, passwordHash: hash }
            ).then(
                
                user => { user.addGroups(roles) }
            )
        });
         
}


