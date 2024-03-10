import React from 'react';

export default function SearchIcon({ fill = '#000', width = '24', height = '24' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 19.4531C15.4183 19.4531 19 15.8714 19 11.4531C19 7.03485 15.4183 3.45312 11 3.45312C6.58172 3.45312 3 7.03485 3 11.4531C3 15.8714 6.58172 19.4531 11 19.4531Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.9999 21.4531L16.6499 17.1031"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
