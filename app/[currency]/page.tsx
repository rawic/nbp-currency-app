import Link from 'next/link';
import { CircleFlag } from 'react-circle-flags';

import { CURRENCY_COUNTRY_CODE_MAP } from '@/data/currency-country.data';
import { getCurrencyData } from '@/queries/get-currency-data';
import { CurrencyView } from '@/views/currency';

import type { Metadata } from 'next';

type Props = {
  params: { currency: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { currency } = params;
  return {
    title: `${currency.toUpperCase()} Exchange Rate | NBP Currency App`,
    description: `View detailed exchange rates and historical data for ${currency.toUpperCase()}.`,
  };
}

type CurrencyDetailsProps = {
  params: {
    currency: string;
  };
} & { searchParams: { start?: string; end?: string; error?: string } };

async function CurrencyDetailsPage({
  params,
  searchParams,
}: CurrencyDetailsProps) {
  const { currency } = params;

  const startDate = searchParams.start || '';
  const endDate = searchParams.end || '';
  const error = searchParams.error || '';

  const rates = await getCurrencyData(currency, startDate, endDate);

  return (
    <>
      <div className="flex flex-col items-start gap-4">
        <div className="mb-6">
          <Link
            href="/"
            className="rounded-md bg-slate-950/70 p-2 text-sm text-indigo-600 hover:bg-slate-950/20 hover:text-indigo-500"
          >
            &larr; Back to currency list
          </Link>
        </div>
        <div className="flex items-center gap-x-4">
          <CircleFlag
            countryCode={CURRENCY_COUNTRY_CODE_MAP[
              currency.toUpperCase()
            ]?.toLowerCase()}
            height={32}
            width={32}
          />
          <h1 className="text-3xl font-semibold text-white">{currency}</h1>
        </div>

        <CurrencyView
          currency={currency}
          initialRates={rates}
          startDate={startDate}
          endDate={endDate}
          error={error}
        />
      </div>
    </>
  );
}

export default CurrencyDetailsPage;
