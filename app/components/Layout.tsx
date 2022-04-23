import React from 'react';
import Footer from './Footer';
import Header from './Header';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="py-8 lg:py-16">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
