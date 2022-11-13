import express from 'express';
import { HomeController } from './home/home.controller.js';
const router = express.Router();
const controller = new HomeController();

/* GET home page. */
router.get('/', (_req, res) => controller.index(_req, res));

export default router;
