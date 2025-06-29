import express from "express";
import communityRoutes from "./routes/community-route.js";

const app = express();

app.use(express.json());

//Communities Routes
app.use("/api", communityRoutes);

export default app;

