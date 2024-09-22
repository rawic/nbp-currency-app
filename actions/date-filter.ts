import { redirect } from 'next/navigation';

const { NBP_MAX_DATE_RANGE_DIF } = process.env;

export async function dateFilter(formData: FormData, currency: string) {
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
