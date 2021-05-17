import React from 'react';

interface Props {}

const AppFooter: React.FC<Props> = () => {
  const getYear = () => new Date().getFullYear();
  return (
    <div className="text-center pt-8">
      <footer>Copyright © Sambit Sahoo {getYear()}, MIT License</footer>
    </div>
  );
};

export default AppFooter;
