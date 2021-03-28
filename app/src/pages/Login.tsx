import React, { useState } from 'react';

interface Props {}

const Login: React.FC<Props> = () => {
  const [opType, setOpType] = useState<'login' | 'signup'>('login');
  return (
    <div>
      <p>Login</p>
    </div>
  );
};

export default Login;
