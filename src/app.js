import express from "express";
import itemsRouter from "./routes/item-routes.js";
import proposalsRouter from "./routes/proposal-routes.js";
import communityRoutes from "./routes/community-route.js";

const app = express();

app.use(express.json());
app.use("/api", itemsRouter);
app.use("/api", proposalsRouter);
app.use("/api", communityRoutes);

export default app;
