import { ExchangeratesRatesACurrencyLast30Out } from '@/types/exchangerates-rates-a-currency-last-30-out';

export type CurrencyViewProps = {
  currency: string;
  initialRates: ExchangeratesRatesACurrencyLast30Out['rates'];
  startDate: string;
  endDate: string;
  error: string;
};
