import React from 'react';

interface Props {
  color: string;
  children: React.ReactNode;
}

const primary = `bg-blue-600 hover:bg-blue-800 text-white`;

const secondary = `bg-gray-600 hover:bg-gray-800 text-white`;

const Button: React.FC<Props> = ({ children, color }) => {
  const colorClass = color === 'primary' ? primary : secondary;
  return (
    <button
      className={`transition-colors py-2 px-4 rounded-lg lg:py-3 lg:px-8 ${colorClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
