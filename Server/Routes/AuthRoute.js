import express from "express";
import {
  RegisterController,
  LoginController,
  SingleController,
  AllUserController,
  getUserPhoto,
} from "../Controller/AuthController.js";
import { requiredSignIn } from "../MiddleWares/AuthMiddleWare.js";
import formidableMiddleware from "express-formidable";

const router = express.Router();

router.post("/register", formidableMiddleware(), RegisterController);
router.post("/login", formidableMiddleware(), LoginController);
router.get("/getSingleUser/:pid", SingleController);
router.get("/getAllUser", requiredSignIn, AllUserController);
router.get("/getUserPhoto/:email", formidableMiddleware(), getUserPhoto);

export default router;
