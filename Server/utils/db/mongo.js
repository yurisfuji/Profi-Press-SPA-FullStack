import mongoose from "mongoose"
import {UserModel, UserRoleModel} from "../models/mongo/index.js";

const DB_USER = process.env.MNG_DB_USER;
const DB_PASSWORD = process.env.MNG_DB_PASSWORD;
const DB_NAME = process.env.MNG_DB_NAME;
const DB_URL = `mongodb://127.0.0.1:27017/${DB_NAME}`;
//const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.t3saew8.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

/*
        await mongoose.connect(DB_URL)
        .then(() => {
            database = mongoose.connection;
            console.log(`DB *${DB_NAME}* connected`);
        })
        .catch((err) => console.log(err));

*/