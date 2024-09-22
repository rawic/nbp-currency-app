'use server';

import { ROUTES } from '@/lib/api/routes';
import { ExchangeratesTablesAOut } from '@/types/exchangerates-tables-a-out';

const { NEXT_PUBLIC_NBP_API_URL: apiUrl } = process.env;

export const getListOfCurrencies = async (): Promise<
  ExchangeratesTablesAOut[number]['rates']
> => {
  const endpoint = ROUTES.LIST_OF_CURRENCIES;
  const path = `${apiUrl}${endpoint}`;
  const response = await fetch(path);
  const data: ExchangeratesTablesAOut = await response.json();

  return data[0].rates;
};
