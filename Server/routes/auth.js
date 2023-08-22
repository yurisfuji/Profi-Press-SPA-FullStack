import { Router } from "express"
//import { register, login, getMe, updateUserRoles } from "../controllers/auth_mongo.js";
import { register, login, getMe } from "../controllers/auth_sequelize.js";
import { registerValidation } from "../validations.js";7
import {checkAuth, checkBlock, handleValidationErrors} from "../utils/index.js";

const router = new Router()

//Register
router.post("/register", registerValidation, handleValidationErrors, register);

//Login
router.post("/login", login);

//Get Me
router.get("/me", checkAuth, checkBlock, getMe);

export default router