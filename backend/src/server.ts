import express, { Application, Request, Response } from 'express';
import config from './config';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from './middlewares/rateLimit.middleware';
import errorMiddleware from './middlewares/error.middleware';
import error_404 from './middlewares/error_404.middleware';
import routes from './routes/index.route';

const app: Application = express();

const PORT = config.port || 3000;
const HOST = config.host || 'localhost';

// Use main middlewares
const corsOptions = { credentials: true, origin: process.env.URL || '*' };
app.use(
  express.json(),
  morgan('common'),
  helmet(),
  cors(corsOptions),
  rateLimit
);

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'welcome to appointment booking api',
  });
});

app.use('/api', routes);
// ERROR 404 MIDDLEWARE
// ! THIS SHOULD BE ALWAYS AT THE END
app.use(errorMiddleware, error_404);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`app is running at http://${HOST}:${PORT}`);
});

export default app;
