import React from 'react';

interface IProps {
  className?: string;
  fill?: string;
  viewBox?: string;
  stroke?: string;
  strokeWidth?: number;
  width?: number;
  height?: number;
}

export const FeedBackIcon: React.FC<IProps> = ({
  className,
  fill = 'none',
  viewBox = '0 0 24 24',
  stroke = 'currentColor',
  strokeWidth = 2,
  width = 32,
  height = 32,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill={fill}
      viewBox={viewBox}
      stroke={stroke}
      strokeWidth={strokeWidth}
      width={width}
      height={height}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
      />
    </svg>
  );
};
