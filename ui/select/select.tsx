import { SelectProps } from './select.types';

export const Select = (props: SelectProps) => {
  const { className, ...rest } = props;

  return (
    <select
      className={`focus:outline-offset-3 rounded-md border-none bg-slate-800 py-2 pl-3 pr-8 text-white outline-none focus:border-none focus:outline-2 focus:outline-indigo-600 focus:ring-0 ${className}`}
      {...rest}
    />
  );
};
