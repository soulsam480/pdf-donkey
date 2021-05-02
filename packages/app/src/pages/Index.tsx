import React from 'react';
import { useUser } from '../store/userContext';

interface Props {}

const Index: React.FC<Props> = () => {
  const { user } = useUser();
  return <div>{user.name}</div>;
};
export default Index;
