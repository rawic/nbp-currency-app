'use server';

import { ROUTES } from '@/lib/api/routes';
import { ExchangeratesTablesAOut } from '@/types/exchangerates-tables-a-out';
import { FetchedRates } from '@/types/fetched-rates';

const { NEXT_PUBLIC_NBP_API_URL: apiUrl } = process.env;

export async function getExchangeRates(): Promise<FetchedRates> {
  try {
    const endpoint = ROUTES.LIST_OF_CURRENCIES;

    const path = `${apiUrl}${endpoint}`;
    const response = await fetch(path);
    const data: ExchangeratesTablesAOut = await response.json();

    const fetchedRates: { [key: string]: number } = {};
    data[0].rates.forEach((rate: { code: string; mid: number }) => {
      fetchedRates[rate.code] = rate.mid;
    });

    return fetchedRates;
  } catch {
    throw new Error('Failed to fetch exchange rates.');
  }
}
