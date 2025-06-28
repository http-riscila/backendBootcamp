import proposalService from "../services/proposal-service.js";

const proposalController = {
  
  // UPDATE
  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }

      // Validate status
      const validStatuses = ["PENDING", "ACCEPTED", "REJECTED", "CANCELLED"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
          error: "Invalid status. Must be one of: PENDING, ACCEPTED, REJECTED, CANCELLED" 
        });
      }

      const updatedProposal = await proposalService.updateStatus(id, status);
      res.json(updatedProposal);
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: "Proposal not found" });
      }
      res.status(500).json({ error: "Error updating proposal status", details: error.message });
    }
  },

  // DELETE
  async delete(req, res) {
    try {
      const { id } = req.params;
      
      await proposalService.delete(id);
      res.status(204).send();
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: "Proposal not found" });
      }
      res.status(500).json({ error: "Error deleting proposal", details: error.message });
    }
  }
};

export default proposalController; 