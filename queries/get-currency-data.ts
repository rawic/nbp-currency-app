'use server';

import { ROUTES } from '@/lib/api/routes';
import { ExchangeratesRatesACurrencyLast30Out } from '@/types/exchangerates-rates-a-currency-last-30-out';

const { NEXT_PUBLIC_NBP_API_URL: apiUrl } = process.env;

export const getCurrencyData = async (
  currencyCode: string,
  startDate?: string,
  endDate?: string,
): Promise<ExchangeratesRatesACurrencyLast30Out['rates']> => {
  let endpoint = ROUTES.CURRENCY_LAST_30_DAYS;

  if (startDate && endDate) {
    endpoint = ROUTES.CURRENCY_WITH_DATE_RANGE;
  }

  let path = `${apiUrl}${endpoint}`.replace('{currency}', currencyCode);

  if (startDate && endDate) {
    path = path.replace('{startDate}', startDate).replace('{endDate}', endDate);
  }

  const response = await fetch(path);
  const data: ExchangeratesRatesACurrencyLast30Out = await response.json();

  return data.rates;
};
