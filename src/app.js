import express from "express";
import proposalRoutes from "./routes/proposal-route.js";

const app = express();

app.use(express.json());

// Routes
app.use("/api", proposalRoutes);

export default app;
