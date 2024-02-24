import express,{json} from "express";
import {accessChat,fetchChats,findChat,groupChat,renameController,groupAddController,groupRemoveController} from "../Controller/ChatController.js"
import { requiredSignIn } from "../MiddleWares/AuthMiddleWare.js";
const router= express.Router();

router.post("/",json(),requiredSignIn,accessChat);
router.get("/",requiredSignIn,fetchChats);
router.post("/group",json(),requiredSignIn,groupChat);
router.put("/rename",json(),requiredSignIn,renameController)
router.put("/groupAdd",json(),requiredSignIn,groupAddController)
router.put("/groupDelete",json(),requiredSignIn,groupRemoveController)
router.get("/:firstId/:secondId",findChat);

export default router;