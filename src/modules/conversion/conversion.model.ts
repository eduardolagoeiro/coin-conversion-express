import { Schema } from 'mongoose';
import coins from '../../helpers/Coins';

export default new Schema(
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
