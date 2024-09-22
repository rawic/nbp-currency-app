import Link from 'next/link';
import { CircleFlag } from 'react-circle-flags';

import { CURRENCY_COUNTRY_CODE_MAP } from '@/data/currency-country.data';

import { TableRowProps } from './table-row.types';

export const TableRow = (props: TableRowProps) => {
  const { currency, code, mid } = props.rate;

  return (
    <tr className="relative cursor-pointer text-gray-200 odd:bg-slate-900 even:bg-slate-950/30 hover:bg-slate-950/50">
      <td className="flex items-center gap-x-4 whitespace-nowrap rounded-l-lg px-6 py-4 text-sm font-medium">
        <CircleFlag
          countryCode={CURRENCY_COUNTRY_CODE_MAP[code].toLowerCase()}
          height="24"
          width="24"
        />
        {currency}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm">{code}</td>
      <td className="whitespace-nowrap rounded-r-lg px-6 py-4 text-sm">
        {mid}
      </td>
      <td className="w-0">
        <Link
          href={`/${code}`}
          className="absolute left-0 top-0 h-full w-full"
        />
      </td>
    </tr>
  );
};
