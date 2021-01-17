import express from 'express';
import { errors } from 'celebrate';
import conversionRouter from './modules/conversion/conversion.router';

const router = express.Router();

router.use('/conversion', conversionRouter);

router.use(errors());

router.use('/status', (req, res) => {
  res.send('ok');
});

router.use('', (req, res, next) => {
  next({
    ...new Error('Not Found'),
    status: 404,
  });
});

router.use(
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

export default router;
