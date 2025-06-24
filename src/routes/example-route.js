import express from "express";
import exampleController from "../controllers/example-controller.js";

const router = express.Router();

// Rota de exemplo
router.get("/example", exampleController.exampleController);

export default router;
