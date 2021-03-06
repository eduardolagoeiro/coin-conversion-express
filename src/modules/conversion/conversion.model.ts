import mongoose, { Schema } from 'mongoose';
import { Conversion } from 'src/types';
import coins from '../../helpers/Coins';

const conversionSchema = new Schema(
  {
    fromCoin: { type: String, required: true, enum: coins },
    toCoin: { type: String, required: true, enum: coins },
    fromValue: { type: Number, required: true },
    toValue: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Conversion>('conversion', conversionSchema);
