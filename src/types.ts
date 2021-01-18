import { Document } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

export type Coin = 'USD' | 'EUR' | 'BRL' | 'BTC';

export interface ConversionRate extends Document {
  _id: string;
  fromCoin: Coin;
  toCoin: Coin;
  rate: number;
  createdAt: Date;
}

export interface Conversion extends Document {
  _id: string;
  fromCoin: Coin;
  toCoin: Coin;
  fromValue: number;
  toValue: number;
  createdAt: Date;
}

export interface ConversionEntry {
  fromCoin: Coin;
  toCoin: Coin;
  fromValue: number;
}

export type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
