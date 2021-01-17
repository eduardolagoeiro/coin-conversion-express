import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';

import router from './router';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json({ limit: '4mb' }));
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

app.use('/api', router);

export default app;
