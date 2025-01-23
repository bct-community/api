import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import http, { IncomingMessage, ServerResponse } from 'http';
import https from 'https';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import '@/utils/log.js';
import { router } from '@/router/index.js';
import { cert } from '@/config/cert.js';
import { env } from '@/config/index.js';
import { connectToMongoDb } from '@/utils/connectToMongoDb.js';

const isHttps = env.NODE_ENV === 'development';

const speedLimiter = {
  windowMs: 1 * 60 * 1000,
  delayAfter: 5,
  delayMs: () => 2000,
};

const limiter = {
  windowMs: 1 * 60 * 1000,
  max: 10,
};

morgan.token('timestamp', () => {
  const date = new Date();
  return date.toLocaleString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour12: false,
  });
});

morgan.token('statusColor', (_req: IncomingMessage, res: ServerResponse) => {
  const status = res.headersSent ? res.statusCode : undefined;

  const color =
    status !== undefined
      ? status >= 500
        ? 31 // red
        : status >= 400
          ? 33 // yellow
          : status >= 300
            ? 36 // cyan
            : status >= 200
              ? 32 // green
              : 0 // no color
      : 0;

  return `\x1b[${color}m${status}\x1b[0m`;
});

const morganFormat =
  ':timestamp - :method :url :statusColor :response-time ms - :res[content-length]';

const app = express();
const server = isHttps
  ? https.createServer({ ...cert }, app)
  : http.createServer(app);

app.use(morgan(morganFormat));
app.use(slowDown(speedLimiter));
app.use(rateLimit(limiter));
app.use(
  cors({
    origin: ['https://localhost:5173', 'https://bct-community.netlify.app'],
  })
);
app.use(express.json());
app.use('/api', router);

connectToMongoDb();

server.listen(env.PORT, () => {
  console.log(
    `Server running at ${isHttps ? 'https' : 'http'}://localhost:${env.PORT}`
  );
});
