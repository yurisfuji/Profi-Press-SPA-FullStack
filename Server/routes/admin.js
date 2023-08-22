import { Router } from "express"
//import {  } from "../controllers/auth_mongo.js";
import { getUsers, updateUser, removeUser, addUser,
         getUserGroups, updateGroup, removeGroup, addGroup } from "../controllers/admin_sequelize.js";
import { registerValidation } from "../validations.js";7
import {checkAuth, checkAdmin, checkBlock, handleValidationErrors} from "../utils/index.js";

const router = new Router()

//Users
router.get("/users", checkAuth, checkAdmin, checkBlock, getUsers);
router.patch("/users/:id", checkAuth, checkAdmin, checkBlock, registerValidation, updateUser);
router.delete("/users/:id", checkAuth, checkAdmin, checkBlock, removeUser);
router.post("/users", checkAuth, checkAdmin, checkBlock, registerValidation, addUser);

//Get UserGroups
router.get("/groups", checkAuth, checkAdmin, checkBlock, getUserGroups);
router.patch("/groups/:id", checkAuth, checkAdmin, checkBlock, updateGroup);
router.delete("/groups/:id", checkAuth, checkAdmin, checkBlock, removeGroup);
router.post("/groups", checkAuth, checkAdmin, checkBlock, addGroup);

export default router