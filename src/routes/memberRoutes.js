const express = require("express");
const router = express.Router();
const membroController = require("../controllers/memberController");

router.post("/membros", membroController.createMembro);
router.get("/membros", membroController.getMembros);
router.get("/membros/:id", membroController.getMembroById);
router.put("/membros/:id", membroController.updateMembro);
router.delete("/membros/:id", membroController.deleteMembro);

module.exports = router;
