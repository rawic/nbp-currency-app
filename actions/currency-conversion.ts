'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { ROUTES } from '@/lib/api/routes';

const { NEXT_PUBLIC_NBP_API_URL: apiUrl } = process.env;

const currencyConversionSchema = z.object({
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  currency: z.string().min(3, 'Currency code is invalid'),
  conversionType: z.enum(['PLN_TO_CUR', 'CUR_TO_PLN']),
});

export async function currencyConversion(formData: FormData) {
  let redirectPath = '/converter/server';
  let result = null;

  try {
    const parsedData = currencyConversionSchema.parse({
      amount: Number(formData.get('amount')),
      currency: formData.get('currency') as string,
      conversionType: formData.get('conversionType') as
        | 'PLN_TO_CUR'
        | 'CUR_TO_PLN',
    });

    const endpoint = ROUTES.CURRENCY_CURRENT_RATE;
    const path = `${apiUrl}${endpoint}`.replace(
      '{currency}',
      parsedData.currency,
    );

    const response = await fetch(path);

    if (!response.ok) {
      throw new Error('Failed to fetch exchange rate');
    }

    const data = await response.json();
    const exchangeRate = data.rates[0].mid;

    if (parsedData.conversionType === 'PLN_TO_CUR') {
      result = parsedData.amount / exchangeRate;
    } else {
      result = parsedData.amount * exchangeRate;
    }

    redirectPath = `/converter/server?amount=${parsedData.amount}&currency=${parsedData.currency}&conversionType=${parsedData.conversionType}&result=${result?.toFixed(2)}`;
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      console.error('Validation Error:', err.errors);
      redirectPath = '/converter/server?error=validation-error';
    } else {
      console.error('Unexpected Error:', err);
      redirectPath = '/converter/server?error=server-error';
    }
  } finally {
    redirect(redirectPath);
  }
}
