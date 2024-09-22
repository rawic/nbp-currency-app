import { InputProps } from './input.types';

export const Input = (props: InputProps) => {
  const { className, ...rest } = props;

  return (
    <input
      className={`focus:outline-offset-3 rounded-md border-none bg-slate-800 px-3 py-2 text-white outline-none focus:border-none focus:outline-2 focus:outline-indigo-600 focus:ring-0 ${className}`}
      {...rest}
    />
  );
};
