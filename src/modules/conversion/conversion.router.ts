import express from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ConversionController from './conversion.controller';
import coins from '../../helpers/Coins';

const router = express.Router();

router.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      fromCoin: Joi.string()
        .valid(...coins)
        .required(),
      toCoin: Joi.string()
        .valid(...coins)
        .required(),
      fromValue: Joi.number().min(0).required(),
    }),
  }),
  ConversionController.create
);

export default router;
