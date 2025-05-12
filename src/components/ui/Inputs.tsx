import { InputHTMLAttributes } from "react";

type IProps = InputHTMLAttributes<HTMLInputElement>

const Inputs = ({ ...rest }: IProps) => {
  return (
    <input
      {...rest}
      className={
        " block w-full rounded-lg border-[1px] border-gray-300 bg-white px-3 py-1.5 text-md text-black  shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-700"
      }
    />
  );
};

export default Inputs;
