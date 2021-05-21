import React from 'react';
import { classNames } from 'src/utils/helpers';

interface Props {
  message: string;
  type: 'error' | 'success';
}

const AppAlerts: React.FC<Props> = ({ message, type }) => {
  return (
    <div
      className={classNames({
        'flex items-center justify-center py-2 px-4 rounded-md max-w-xs lg:max-w-2xl drop-shadow-lg transition-all mb-2': true,
        'bg-green-400 text-white': type === 'success',
        'bg-red-400 text-white': type === 'error',
      })}
    >
      <div className="text-md font-semibold">{message}</div>
    </div>
  );
};

export default AppAlerts;
