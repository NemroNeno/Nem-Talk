import express,{json} from "express"
const router= express.Router();
import {creatMessage,getAllMessage,sendMessage} from "../Controller/MessageController.js"
import { requiredSignIn } from "../MiddleWares/AuthMiddleWare.js";


//router.post("/",creatMessage);
router.get("/:chatId",getAllMessage);
router.post("/",json(),requiredSignIn,sendMessage);

export default router;

