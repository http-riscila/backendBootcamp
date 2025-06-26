import express from "express";
import proposalController from "../controllers/proposalController.js";

const router = express.Router();


// Rota POST para criar proposta
router.post('/proposal', proposalController.createProposal);

// Rota GET para listar propostas
router.get('/proposal', proposalController.getProposal);

export default router;


