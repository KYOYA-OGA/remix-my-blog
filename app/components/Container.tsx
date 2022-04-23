import React from 'react';

interface Props {
  children: React.ReactNode;
  small?: boolean;
}

const Container: React.FC<Props> = ({ children, small }) => {
  return (
    <div
      className={`container mx-auto px-5 lg:px-0 ${
        small ? 'md:px-16 lg:max-w-4xl' : 'lg:max-w-6xl'
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
