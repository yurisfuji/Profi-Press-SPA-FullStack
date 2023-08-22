import { Router } from "express"
import { getCalcRequests, checkCalcRequestCode, getDistinctValuesByField } from "../controllers/pro_sequelize.js";
//import { registerValidation } from "../validations.js";7
import {checkAuth, checkBlock, handleValidationErrors} from "../utils/index.js";

const router = new Router()

//Get Calc Requests
router.get("/calcrequests", checkAuth, checkBlock, getCalcRequests);

//Get Cities to Delivery or Managers
router.get("/calcrequests/fieldvalues", checkAuth, checkBlock, getDistinctValuesByField);

//check CalcRequest Code
router.get("/calcrequests/check", checkAuth, checkBlock, checkCalcRequestCode);

export default router