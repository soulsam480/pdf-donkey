import React from 'react';

interface Props {}

const AppLoader: React.FC<Props> = () => {
  return (
    <div>
      <div className="modal-overlay z-30 absolute w-full h-full bg-white"></div>
      <div className="absolute top-1/2 z-40  left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center text-white text-3xl lg:text-6xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="block bg-transparent m-auto"
            width="100px"
            height="100px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <circle
              cx="50"
              cy="50"
              fill="none"
              stroke="#6366F1"
              strokeWidth="9"
              r="40"
              strokeDasharray="188.49555921538757 64.83185307179586"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1s"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
              ></animateTransform>
            </circle>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AppLoader;
