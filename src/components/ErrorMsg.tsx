interface IProps {
  msg: string;
}

const ErrorMsg = ({ msg }: IProps) => {
  if (!msg) return null;
  
  return (
    <span className="block text-sm text-red-500 dark:text-red-400 mt-1">
      {msg}
    </span>
  );
};

export default ErrorMsg;