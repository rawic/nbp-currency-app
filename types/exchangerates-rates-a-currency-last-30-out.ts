export type ExchangeratesRatesACurrencyLast30Out = {
  table: string;
  currency: string;
  code: string;
  rates: ExchangeratesRatesACurrencyLast30OutRates[];
};

export type ExchangeratesRatesACurrencyLast30OutRates = {
  no: string;
  effectiveDate: string;
  mid: number;
};
