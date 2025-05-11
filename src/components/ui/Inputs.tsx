import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  
}

const Inputs = ({ ...rest }: IProps) => {
  return (
    <input
      {...rest}
      className={
        " block w-full rounded-lg border-[2px] border-gray-300 bg-slate-50 px-3 py-1.5 text-md text-black  shadow-lg focus:outline-none focus:ring-1 focus:ring-blue-700"
      }
    />
  );
};

export default Inputs;
