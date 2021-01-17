import { Request, Response, NextFunction } from 'express';

export type Coin = 'USD' | 'EUR' | 'BRL' | 'BTC';

export interface Conversion {
  id: string;
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

export type Controller = Record<
  string,
  (req: Request, res: Response, next: NextFunction) => void
>;
