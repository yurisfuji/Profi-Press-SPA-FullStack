import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoute from "./routes/auth.js";
import adminRoute from './routes/admin.js'
import proRoute from './routes/pro.js'
import { initModels } from './models/sequelize/index.js'
import {getSequelizeInstance, addNewUser, getUsers, getPCRs} from './utils/db/sequelize.js'

dotenv.config();

const app = express();

//Constants
const PORT = process.env.PORT;

const options = {
  keyDB: 'SQLLITE',
  DB_NAME : `./${process.env.SQLLITE_DB_NAME}`
}

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use('/auth', authRoute);
app.use('/admin', adminRoute);
app.use('/pro', proRoute);

function start() {

  try {
    initModels(getSequelizeInstance(options))
    //.then(() => addNewUser())
    .then(() => getPCRs());
    //addNewUser(db);
    
    //getUsers(db);


    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

  } catch (err) {
    console.log(err);
  }
}

start();

