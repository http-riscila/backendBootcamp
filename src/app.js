import express from "express";
import cors from "cors";
import itemsRouter from "./routes/item-routes.js";
import proposalsRouter from "./routes/proposal-routes.js";
import communityRoutes from "./routes/community-route.js";
import usersRouter from "./routes/user-routes.js";
import membersRouter from "./routes/member-routes.js";
import authRouter from "./routes/auth-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", itemsRouter);
app.use("/api", proposalsRouter);
app.use("/api", communityRoutes);
app.use("/api", usersRouter);
app.use("/api", membersRouter);
app.use("/auth", authRouter);

export default app;
