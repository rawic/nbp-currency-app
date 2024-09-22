import { getExchangeRates } from '@/queries/get-exchange-rates';
import { FetchedRates } from '@/types/fetched-rates';

import { CurrencyConverter } from './currency-converter';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client-Side Currency Converter | NBP Currency App',
  description:
    'Use the client-side currency converter to calculate exchange rates instantly.',
};

let cachedData: FetchedRates = {};

const fetchData = async () => {
  try {
    const data = await getExchangeRates();

    if (data) {
      cachedData = data;

      return data;
    }

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);

    if (cachedData.length) {
      return cachedData;
    }

    throw new Error('Error fetching data');
  }
};

export default async function ConverterPage() {
  const initialRates = await fetchData();

  return <CurrencyConverter initialRates={initialRates} />;
}
