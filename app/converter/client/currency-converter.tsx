'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';

import { getExchangeRates } from '@/queries/get-exchange-rates';
import { Input, Select } from '@/ui';

const currencySchema = z.object({
  amount: z
    .number()
    .min(0.01, { message: 'Amount must be greater than 0' })
    .positive(),
  currency: z.string().min(3, { message: 'Invalid currency' }),
  conversionType: z.enum(['PLN_TO_CUR', 'CUR_TO_PLN']),
});

type CurrencyConverterProps = {
  initialRates: { [key: string]: number };
};

export const CurrencyConverter = ({ initialRates }: CurrencyConverterProps) => {
  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState('EUR');
  const [conversionType, setConversionType] = useState<
    'PLN_TO_CUR' | 'CUR_TO_PLN'
  >('PLN_TO_CUR');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rates, setRates] = useState<{ [key: string]: number }>(initialRates);
  const [lastFetched, setLastFetched] = useState<Date>(new Date());
  const getCurrencies = Object.keys(rates);

  useEffect(() => {
    recalculateConversion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, currency, conversionType]);

  const recalculateConversion = () => {
    try {
      const parsedData = currencySchema.parse({
        amount: Number(amount),
        currency,
        conversionType,
      });

      const exchangeRate = rates[parsedData.currency];
      if (!exchangeRate) {
        throw new Error('Invalid currency code.');
      }

      let result: number;
      if (parsedData.conversionType === 'PLN_TO_CUR') {
        result = parsedData.amount / exchangeRate;
      } else {
        result = parsedData.amount * exchangeRate;
      }

      setConvertedAmount(result);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError('Conversion failed. Please check the inputs.');
      }
      setConvertedAmount(null);
    }
  };

  async function refetchRates() {
    setLoading(true);
    const newRates = await getExchangeRates();
    setRates(newRates);
    setLastFetched(new Date());
    setLoading(false);
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between gap-4 max-sm:flex-col sm:items-center">
        <h1 className="text-3xl font-semibold text-white">
          Currency Converter
        </h1>
        <button
          onClick={refetchRates}
          type="button"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 max-sm:mr-auto"
          disabled={loading}
        >
          {loading ? 'Updating Rates...' : 'Update Rates'}
        </button>
      </div>

      {lastFetched && (
        <div className="mb-6 text-gray-400" suppressHydrationWarning>
          Last updated: {lastFetched.toLocaleString()}
        </div>
      )}

      <form className="mb-6 flex flex-col gap-4">
        <div className="flex w-full gap-4">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Amount"
            min="0"
          />
          <Select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {getCurrencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </Select>
          <Select
            value={conversionType}
            onChange={(e) =>
              setConversionType(e.target.value as 'PLN_TO_CUR' | 'CUR_TO_PLN')
            }
            className="rounded-md border border-gray-600 bg-slate-800 py-2 pl-3 pr-8 text-white"
          >
            <option value="PLN_TO_CUR">PLN to {currency}</option>
            <option value="CUR_TO_PLN">{currency} to PLN</option>
          </Select>
        </div>
      </form>

      {convertedAmount !== null && !loading && (
        <div className="mt-4 text-white">
          <p>
            {conversionType === 'PLN_TO_CUR'
              ? `${amount} PLN = ${convertedAmount.toFixed(2)} ${currency}`
              : `${amount} ${currency} = ${convertedAmount.toFixed(2)} PLN`}
          </p>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
