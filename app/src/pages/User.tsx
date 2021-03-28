import React, { useContext } from 'react';
import { userContext } from '../store/userContext';

interface Props {}

const User: React.FC<Props> = () => {
  const userState = useContext(userContext);
  return <div></div>;
};

export default User;
