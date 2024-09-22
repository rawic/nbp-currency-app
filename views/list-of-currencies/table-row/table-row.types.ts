import { ExchangeratesTablesAOut } from '@/types/exchangerates-tables-a-out';

export type TableRowProps = {
  rate: ExchangeratesTablesAOut[number]['rates'][number];
};
