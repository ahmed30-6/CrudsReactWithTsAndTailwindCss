import { motion } from 'framer-motion';

interface IProps {
  color: string;
  onClick: () => void;
  className?: string;
}

const CircleColor = ({ color, onClick, className = '' }: IProps) => {
  return (
    <motion.span
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{ backgroundColor: color }}
      className={`inline-block w-6 h-6 rounded-full cursor-pointer border border-gray-200 dark:border-gray-700 shadow-sm transition-transform ${className}`}
      onClick={onClick}
    />
  );
};

export default CircleColor;
