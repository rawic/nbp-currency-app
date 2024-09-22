import { redirect } from 'next/navigation';

import { convertCurrency } from '@/actions/convert-currency';
import { getListOfCurrencies } from '@/queries/get-list-of-currencies';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Server-Side Currency Converter | NBP Currency App',
  description:
    'Convert currencies using the server-side currency converter for accurate results.',
};

export default async function ConverterPage({
  searchParams,
}: {
  searchParams?: {
    amount?: string;
    currency?: string;
    conversionType?: string;
    result?: string;
  };
}) {
  const amount = searchParams?.amount || '';
  const currency = searchParams?.currency || 'EUR';
  const conversionType = searchParams?.conversionType || 'PLN_TO_CUR';
  const convertedResult = searchParams?.result || null;
  const list = await getListOfCurrencies();
  const getCurrencies = list.map((currency) => currency.code);

  async function handleSubmit(formData: FormData) {
    'use server';

    const amount = Number(formData.get('amount'));
    const currency = formData.get('currency') as string;
    const conversionType = formData.get('conversionType') as
      | 'PLN_TO_CUR'
      | 'CUR_TO_PLN';

    const result = await convertCurrency(amount, currency, conversionType);

    redirect(
      `/converter/server?amount=${amount}&currency=${currency}&conversionType=${conversionType}&result=${result}`,
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">
          Currency Converter
        </h1>
      </div>

      <form
        action={handleSubmit}
        method="GET"
        className="mb-6 flex flex-col gap-4"
      >
        <div className="flex flex-wrap gap-4">
          <input
            type="number"
            name="amount"
            defaultValue={amount}
            className="rounded-md border border-gray-600 bg-slate-800 py-2 pl-3 text-white max-sm:w-full"
            placeholder="Amount"
            min="0"
            required
          />
          <select
            name="currency"
            defaultValue={currency}
            className="rounded-md border border-gray-600 bg-slate-800 py-2 pl-3 pr-8 text-white"
            required
          >
            {getCurrencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <select
            name="conversionType"
            defaultValue={conversionType}
            className="rounded-md border border-gray-600 bg-slate-800 py-2 pl-3 pr-8 text-white"
            required
          >
            <option value="PLN_TO_CUR">PLN to Currency</option>
            <option value="CUR_TO_PLN">Currency to PLN</option>
          </select>
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
          <p>Conversion Result: {convertedResult}</p>
        </div>
      )}
    </>
  );
}
