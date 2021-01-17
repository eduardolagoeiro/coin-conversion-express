import { Controller, ConversionEntry } from '../../types';

const controller: Controller = {
  create: async (req, res, next) => {
    try {
      const conversionEntry: ConversionEntry = req.body;
      // save to db
      res.status(200).send(conversionEntry);
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
