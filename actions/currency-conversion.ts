'use server';

import { redirect } from 'next/navigation';

import { ROUTES } from '@/lib/api/routes';

const { NEXT_PUBLIC_NBP_API_URL: apiUrl } = process.env;

export async function currencyConversion(formData: FormData) {
  const amount = Number(formData.get('amount'));
  const currency = formData.get('currency') as string;
  const conversionType = formData.get('conversionType') as
    | 'PLN_TO_CUR'
    | 'CUR_TO_PLN';
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

  redirect(
    `/converter/server?amount=${amount}&currency=${currency}&conversionType=${conversionType}&result=${result.toFixed(2)}`,
  );
}
