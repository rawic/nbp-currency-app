import { currencyConversion } from '@/actions/currency-conversion';
import { getListOfCurrencies } from '@/queries/get-list-of-currencies';
import { Input, Select } from '@/ui';

import { FormProps } from './form.types';

export const Form = async (props: FormProps) => {
  const { amount, currency, conversionType } = props;
  const list = await getListOfCurrencies();
  const getCurrencies = list.map((currency) => currency.code);

  return (
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
          step=".01"
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
  );
};
