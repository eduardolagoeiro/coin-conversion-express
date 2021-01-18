import { Controller, ConversionEntry } from '../../types';
import ConversionModel from './conversion.model';
import MoneyConverter from '../../helpers/MoneyConverter';
import ConversionRateModel from '../conversionRate/conversionRate.model';

const controller: {
  create: Controller;
  list: Controller;
} = {
  create: async (req, res, next) => {
    try {
      const conversionEntry: ConversionEntry = req.body;
      let inverse = false;
      let conversionRate = await ConversionRateModel.findOne({
        fromCoin: conversionEntry.fromCoin,
        toCoin: conversionEntry.toCoin,
      });
      if (!conversionRate) {
        conversionRate = await ConversionRateModel.findOne({
          fromCoin: conversionEntry.toCoin,
          toCoin: conversionEntry.fromCoin,
        });
        inverse = true;
      }
      if (!conversionRate || !(conversionRate?.rate > 0)) {
        return next({
          ...new Error('there is no conversion rate'),
          status: 404,
        });
      }
      const converted = MoneyConverter.convert(
        conversionEntry.fromValue,
        conversionRate.rate,
        {
          inverse,
        }
      );
      const conversion = await ConversionModel.create({
        ...conversionEntry,
        toValue: converted,
      });
      return res.status(200).send(conversion);
    } catch (error) {
      return next(error);
    }
  },
  list: async (req, res, next) => {
    try {
      const conversions = await ConversionModel.find({}, { __v: 0 });
      return res.send(conversions);
    } catch (error) {
      return next(error);
    }
  },
};

export default controller;
