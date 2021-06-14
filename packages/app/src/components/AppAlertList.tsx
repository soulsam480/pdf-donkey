import React from 'react';
import { useAlert } from 'src/store/useAlert';
import AppAlerts from 'src/components/AppAlerts';

interface Props {}
const AppAlertList: React.FC<Props> = () => {
  const { alerts } = useAlert();
  return (
    <div className="alert-list">
      {alerts.map((alert) => (
        <AppAlerts key={alert.message} type={alert.type} message={alert.message} />
      ))}
    </div>
  );
};

export default AppAlertList;
