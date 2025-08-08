import express from "express";
import cors from "cors";
import itemsRouter from "./routes/item-routes.js";
import proposalsRouter from "./routes/proposal-routes.js";
import communityRoutes from "./routes/community-route.js";
import usersRouter from "./routes/user-routes.js";
import membersRouter from "./routes/member-routes.js";
import authRouter from "./routes/auth-routes.js";

const app = express();

// Configuração mais específica do CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://127.0.0.1:5175', 'http://127.0.0.1:5176'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Middleware de logging para debug
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

app.use("/api", itemsRouter);
app.use("/api", proposalsRouter);
app.use("/api", communityRoutes);
app.use("/api", usersRouter);
app.use("/api", membersRouter);
app.use("/api", authRouter);

export default app;
