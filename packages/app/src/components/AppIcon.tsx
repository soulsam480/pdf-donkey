import React from 'react';

interface Props
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  icon: string;
  size?: string;
}

const AppIcon: React.FC<Props> = ({ icon, size, ...rest }) => {
  return (
    <span {...rest}>
      <i
        style={{ fontSize: size || '20px' }}
        className="iconify"
        data-icon={icon}
        data-inline={true}
      />
    </span>
  );
};

export default AppIcon;
