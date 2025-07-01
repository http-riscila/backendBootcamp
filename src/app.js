import express from "express";
import itemsRouter from "./routes/item-routes.js";
import proposalsRouter from "./routes/proposal-routes.js";
import communityRoutes from "./routes/community-route.js";
import usersRouter from "./routes/user-routes.js";
import membersRouter from "./routes/member-routes.js";

const app = express();

app.use(express.json());

app.use("/api", itemsRouter);
app.use("/api", proposalsRouter);
app.use("/api", communityRoutes);
app.use("/api", usersRouter);
app.use("/api", membersRouter);

export default app;
