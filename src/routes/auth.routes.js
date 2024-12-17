"use strict";
import { Router } from "express";
import authController from "../controllers/auth.controller.js";


const router = Router();


router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refresh);

export default router;