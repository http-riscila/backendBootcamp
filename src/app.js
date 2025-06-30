import express from "express";
import itemsRouter from "./routes/item-routes.js";
import proposalRouter from "./routes/proposal-routes.js";

const app = express();

app.use(express.json());

app.use("/api", itemsRouter);
app.use("/api", proposalRouter);

export default app;
