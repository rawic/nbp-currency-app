'use client';

import {
    Area,
    CartesianGrid,
    ComposedChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    TooltipProps,
    XAxis,
    YAxis,
} from 'recharts';

import { ChartProps } from './chart.types';

import type {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

export const Chart = ({ chartData }: ChartProps) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="2" stroke="#ffffff21" />
          <XAxis dataKey="date" stroke="#475569" tick={{ fontSize: 12 }} />
          <YAxis
            stroke="#475569"
            tick={{ fontSize: 12 }}
            domain={[
              (dataMin: number) => Math.max(0, dataMin - 0.1),
              'dataMax + 0.1',
            ]}
            tickFormatter={(value) => value.toFixed(4)}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#4f46e5' }} />
          <Area
            type="natural"
            dataKey="value"
            fill="#4e46e526"
            stroke="#4f46e5"
          />
          <Line
            type="basis"
            dataKey="value"
            stroke="none"
            strokeWidth={2}
            dot={{
              r: 4,
              fill: '#4f46e5',
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;

    return (
      <div className="rounded-md bg-slate-900 p-2 text-sm text-white">
        <p>{`${label}`}</p>
        {value && <p>{`Exchange Rate: ${Number(value).toFixed(4)}`}</p>}
      </div>
    );
  }

  return null;
};
