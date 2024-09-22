'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

const { NBP_MAX_DATE_RANGE_DIF } = process.env;

const dateFilterSchema = z.object({
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid start date',
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid end date',
  }),
});

export async function dateFilter(formData: FormData, currency: string) {
  let redirectPath = `/${currency}`;

  try {
    const parsedData = dateFilterSchema.parse({
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
    });

    const start = new Date(parsedData.startDate);
    const end = new Date(parsedData.endDate);

    const difference = Math.floor(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (difference > Number(NBP_MAX_DATE_RANGE_DIF)) {
      redirectPath = `/${currency}?error=date-range-exceeded`;
    } else {
      redirectPath = `/${currency}?start=${parsedData.startDate}&end=${parsedData.endDate}`;
    }
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      console.error('Validation Error:', err.errors);
      redirectPath = `/${currency}?error=validation-error`;
    } else {
      console.error('Unexpected Error:', err);
      redirectPath = `/${currency}?error=server-error`;
    }
  } finally {
    redirect(redirectPath);
  }
}
