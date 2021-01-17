import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  );
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

app.use('/api/status', (req, res) => {
  res.send('ok');
});

app.use('/api', (req, res, next) => {
  next({
    ...new Error('Not Found'),
    status: 404,
  });
});

app.use(
  (
    err: { status: null | number; message: string },
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // eslint-disable-next-line no-console
    if (!err.status || err.status === 500) console.error(err);
    res.status(err.status || 500).send({
      message: err.message,
      statusCode: err.status || 500,
      error: err.message,
    });
    return next();
  }
);

export default app;
