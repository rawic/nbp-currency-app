import Link from 'next/link';
import { CircleFlag } from 'react-circle-flags';

import { CURRENCY_COUNTRY_CODE_MAP } from '@/data/currency-country.data';

import { TableRowProps } from './table-row.types';

export const TableRow = (props: TableRowProps) => {
  const { currency, code, mid } = props.rate;

  return (
    <tr className="relative cursor-pointer text-gray-200 odd:bg-slate-900 even:bg-slate-950/30 sm:hover:bg-slate-950/50">
      <td>
        <Link
          href={`/${code}`}
          className="flex items-center gap-x-4 whitespace-nowrap rounded-l-lg px-6 py-4 text-sm font-medium"
          prefetch={true}
        >
          <CircleFlag
            countryCode={CURRENCY_COUNTRY_CODE_MAP[code].toLowerCase()}
            height="24"
            width="24"
          />
          {currency}
        </Link>
      </td>
      <td>
        <Link
          href={`/${code}`}
          className="whitespace-nowrap px-6 py-4 text-sm"
          prefetch={true}
        >
          {code}
        </Link>
      </td>
      <td>
        <Link
          href={`/${code}`}
          className="whitespace-nowrap rounded-r-lg px-6 py-4 text-sm"
          prefetch={true}
        >
          {mid}
        </Link>
      </td>
    </tr>
  );
};
