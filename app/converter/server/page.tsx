import { Suspense } from 'react';

import { Form } from '@/views/converter-server';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Server-Side Currency Converter | NBP Currency App',
  description:
    'Convert currencies using the server-side currency converter for accurate results.',
};

type ConverterPageProps = {
  searchParams?: {
    amount?: string;
    currency?: string;
    conversionType?: 'PLN_TO_CUR' | 'CUR_TO_PLN';
    result?: string;
  };
};

export default function ConverterPage({ searchParams }: ConverterPageProps) {
  const amount = searchParams?.amount || '';
  const currency = searchParams?.currency || 'EUR';
  const conversionType = searchParams?.conversionType || 'PLN_TO_CUR';
  const convertedResult = searchParams?.result || null;

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">
          Currency Converter
        </h1>
      </div>

      <Suspense fallback={<p className="text-white">Loading...</p>}>
        <Form
          amount={amount}
          currency={currency}
          conversionType={conversionType}
        />
      </Suspense>

      {convertedResult && (
        <div className="mt-4 text-white">
          <p>
            Conversion Result: {convertedResult}{' '}
            {conversionType === 'PLN_TO_CUR' ? currency : 'PLN'}
          </p>
        </div>
      )}
    </>
  );
}
