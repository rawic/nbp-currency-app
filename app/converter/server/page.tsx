import { currencyConversion } from '@/actions/currency-conversion';
import { getListOfCurrencies } from '@/queries/get-list-of-currencies';
import { Input, Select } from '@/ui';

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

export default async function ConverterPage({
  searchParams,
}: ConverterPageProps) {
  const amount = searchParams?.amount || '';
  const currency = searchParams?.currency || 'EUR';
  const conversionType = searchParams?.conversionType || 'PLN_TO_CUR';
  const convertedResult = searchParams?.result || null;
  const list = await getListOfCurrencies();
  const getCurrencies = list.map((currency) => currency.code);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">
          Currency Converter
        </h1>
      </div>

      <form
        action={currencyConversion}
        method="GET"
        className="mb-6 flex flex-col gap-4"
      >
        <div className="flex flex-wrap gap-4">
          <Input
            type="number"
            name="amount"
            defaultValue={amount}
            className="max-sm:w-full"
            placeholder="Amount"
            min="0"
            required
          />
          <Select name="currency" defaultValue={currency} required>
            {getCurrencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </Select>
          <Select name="conversionType" defaultValue={conversionType} required>
            <option value="PLN_TO_CUR">PLN to Currency</option>
            <option value="CUR_TO_PLN">Currency to PLN</option>
          </Select>
        </div>

        <button
          type="submit"
          className="mr-auto rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          Convert
        </button>
      </form>

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
