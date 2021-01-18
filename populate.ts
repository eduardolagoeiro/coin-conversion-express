import * as dotenv from 'dotenv';
import db from './src/db';
import coins from './src/helpers/Coins';
import ConversionRateModel from './src/modules/conversionRate/conversionRate.model';

dotenv.config();

db.connect().then(() => {
  const promises = [];
  for (let i = 0; i < coins.length; i += 1) {
    const fromCoin = coins[i];
    for (let j = 0; j < coins.length; j += 1) {
      const toCoin = coins[j];
      promises.push(
        ConversionRateModel.create({
          fromCoin,
          toCoin,
          rate: parseFloat((Math.random() * 3).toFixed(2)),
        })
      );
    }
  }
  return Promise.all(promises).then(() => process.exit(0));
});
