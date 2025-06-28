import express from 'express';
import { createProposal, getProposal } from '../controllers/proposal-controllers.js';

const proposalRouter = express.Router();

// Rota POST para criar proposta
router.post('/proposals', createProposal);

// Rota GET para listar propostas
router.get('/proposals', getProposal);

export default proposalRouter;
