import express from "express";
import itemsRouter from "./routes/item-routes.js";

const app = express();

app.use(express.json());

app.use("/api", itemsRouter);

export default app;
