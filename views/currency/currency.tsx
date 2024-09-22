import { redirect } from 'next/navigation';

import { Chart } from './chart/chart';
import { CurrencyViewProps } from './currency.types';

const NBP_MIN_DATE =
  process.env.NEXT_PUBLIC_NBP_CURRENCY_MIN_DATE || '2002-01-02';
const NBP_MAX_DATE_RANGE_DIF =
  process.env.NEXT_PUBLIC_NBP_CURRENCY_MAX_DATE_RANGE_DIFFERENCE || 93;

export const CurrencyView = (props: CurrencyViewProps) => {
  const { currency, initialRates, startDate, endDate, error } = props;

  const chartData = initialRates.map((rate) => ({
    date: rate.effectiveDate,
    value: rate.mid,
  }));

  const startDateDefaultValue = startDate || chartData[0].date;
  const endDateDefaultValue = endDate || chartData[chartData.length - 1].date;
  const minAvailableDate = new Date(NBP_MIN_DATE).toISOString().split('T')[0];
  const maxAvailableDate = new Date().toISOString().split('T')[0];

  async function handleDateSubmit(formData: FormData) {
    'use server';

    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const difference = Math.floor(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (difference > Number(NBP_MAX_DATE_RANGE_DIF)) {
      return redirect(`/${currency}?error=date-range-exceeded`);
    }

    redirect(`/${currency}?start=${startDate}&end=${endDate}`);
  }

  return (
    <div className="mt-4 w-full sm:mt-8">
      <h2 className="mb-4 text-lg font-semibold text-slate-200 sm:text-xl">
        Currency Exchange Rate History
      </h2>

      {/* Date Range Picker Form */}
      <form
        action={handleDateSubmit}
        className="mb-6 flex items-center gap-4 max-sm:flex-col"
      >
        <div className="flex gap-4">
          <input
            type="date"
            name="startDate"
            className="focus:outline-offset-3 rounded-md border border-none bg-slate-800 px-3 py-2 text-white outline-none focus:border-none focus:outline-2 focus:outline-indigo-600 focus:ring-0"
            placeholder="Start Date"
            defaultValue={startDateDefaultValue}
            min={minAvailableDate}
            max={maxAvailableDate}
          />
          <input
            type="date"
            name="endDate"
            className="rounded-md border border-none bg-slate-800 px-3 py-2 text-white"
            placeholder="End Date"
            defaultValue={endDateDefaultValue}
            min={minAvailableDate}
            max={maxAvailableDate}
          />
        </div>
        <button className="rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-indigo-700">
          Update Range
        </button>

        {error && (
          <p className="text-sm text-red-500">
            Date range exceeded. Maximum range is {NBP_MAX_DATE_RANGE_DIF} days.
          </p>
        )}
      </form>

      {/* Chart Section */}
      <div className="mb-8 rounded-lg bg-slate-900 p-4">
        <Chart chartData={chartData} />
      </div>

      {/* Historical Rates Table */}
      <div className="mt-8 w-full">
        <h2 className="mb-4 text-xl font-semibold text-slate-200">
          Historical Rates
        </h2>

        <table className="min-w-full bg-slate-900">
          <thead>
            <tr className="text-xs font-medium uppercase text-indigo-500">
              <th scope="col" className="px-6 py-3 text-start">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-start">
                Exchange Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {initialRates.map((rate) => (
              <tr
                key={rate.effectiveDate}
                className="text-gray-200 odd:bg-slate-950/30 even:bg-slate-950/50"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {rate.effectiveDate}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {rate.mid}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
