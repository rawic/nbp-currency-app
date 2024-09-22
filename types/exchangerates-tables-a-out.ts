export type ExchangeratesTablesAOut = {
  table: string;
  no: string;
  tradingDate: string;
  effectiveDate: string;
  rates: ExchangeratesTablesAOutRates[];
}[];

type ExchangeratesTablesAOutRates = {
  currency: string;
  code: string;
  mid: number;
};
