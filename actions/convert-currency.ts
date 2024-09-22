import { ROUTES } from '@/lib/api/routes';

const { NEXT_PUBLIC_NBP_API_URL: apiUrl } = process.env;

export async function convertCurrency(
  amount: number,
  currency: string,
  conversionType: 'PLN_TO_CUR' | 'CUR_TO_PLN',
) {
  const endpoint = ROUTES.CURRENCY_CURRENT_RATE;
  const path = `${apiUrl}${endpoint}`.replace('{currency}', currency);

  const response = await fetch(path);
  const data = await response.json();

  const exchangeRate = data.rates[0].mid;

  let result: number;

  if (conversionType === 'PLN_TO_CUR') {
    result = amount / exchangeRate;
  } else {
    result = amount * exchangeRate;
  }

  return result.toFixed(2);
}
