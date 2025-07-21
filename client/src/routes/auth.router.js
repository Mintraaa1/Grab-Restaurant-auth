import express from "express";
const router = express.Router();
import authController from "../../controllers/auth.controller.js";

router.post('/signup', authController.signup);