import React, { useContext } from 'react';
import { useUser } from '../store/userContext';

interface Props {}

const User: React.FC<Props> = () => {
  const userState = useUser();
  return <div></div>;
};

export default User;
