import mongoose, { Schema } from 'mongoose';
import { ConversionRate } from 'src/types';
import coins from '../../helpers/Coins';

const conversionRateSchema = new Schema(
  {
    fromCoin: { type: String, required: true, enum: coins },
    toCoin: { type: String, required: true, enum: coins },
    rate: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ConversionRate>(
  'conversionRate',
  conversionRateSchema
);
