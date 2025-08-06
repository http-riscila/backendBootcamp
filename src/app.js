import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import authRouter from './routes/auth-routes.js';
import communityRoutes from './routes/community-route.js';
import itemsRouter from './routes/item-routes.js';
import membersRouter from './routes/member-routes.js';
import proposalsRouter from './routes/proposal-routes.js';
import usersRouter from './routes/user-routes.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/api', itemsRouter);
app.use('/api', proposalsRouter);
app.use('/api', communityRoutes);
app.use('/api', usersRouter);
app.use('/api', membersRouter);
app.use('/auth', authRouter);

export default app;
