import { getListOfCurrencies } from '@/queries/get-list-of-currencies';
import { ExchangeratesTablesAOut } from '@/types/exchangerates-tables-a-out';
import { TableRow } from '@/views/list-of-currencies';

let cachedData: ExchangeratesTablesAOut[number]['rates'] = [];

const fetchData = async () => {
  try {
    const data = await getListOfCurrencies();

    if (Array.isArray(data)) {
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

async function ListOfCurrenciesPage() {
  const exchangerates = await fetchData();

  return (
    <>
      <div className="-m-1.5 overflow-x-auto">
        <div className="inline-block min-w-full p-1.5 align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <caption className="p-5 text-left text-lg font-semibold text-white">
                List of Currencies
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  The table below lists the currencies and their average value.
                </p>
              </caption>
              <thead>
                <tr className="text-xs font-medium uppercase text-indigo-500">
                  <th scope="col" className="px-6 py-3 text-start">
                    Currency
                  </th>
                  <th scope="col" className="px-6 py-3 text-start">
                    Currency Code
                  </th>
                  <th scope="col" className="px-6 py-3 text-start">
                    Currency Avg. Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {exchangerates.map((rate) => (
                  <TableRow rate={rate} key={rate.code} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListOfCurrenciesPage;
