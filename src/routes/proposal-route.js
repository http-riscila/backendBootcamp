const express = require('express');
const router = express.Router();
const proposalController = require('../controllers/proposalController');

// Routes for proposal management
router.put('/:id', proposalController.updateProposal);
router.delete('/:id', proposalController.deleteProposal);

module.exports = router;
