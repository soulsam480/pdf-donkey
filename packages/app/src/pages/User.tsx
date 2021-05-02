import React from 'react';
import TemplateCards from 'src/components/TemplateCards';
import { useUser } from 'src/store/userContext';

interface Props {}

const User: React.FC<Props> = () => {
  const { user } = useUser();
  return (
    <div className="container">
      <h2>
        <b>Dashboard</b>
      </h2>
      <p>
        {' '}
        Hii <b>{user.name} </b> ! Welcome to PDF-Donkey.
      </p>
      <p>You can find all of your templates here.</p>
      <TemplateCards />
    </div>
  );
};

export default User;
