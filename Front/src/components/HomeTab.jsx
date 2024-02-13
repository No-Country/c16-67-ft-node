import React from 'react';

export default function HomeTab() {
  return (
    <div className="flex h-12">
      <div className="flex-grow basis-0 text-center h-full flex items-center justify-center text-blue-500 border-blue-500 border-b-2">
        Feed
      </div>
      <div className="flex-grow basis-0 text-center h-full flex items-center justify-center border-gray-300 border-b-2">
        Lost/In adoption
      </div>
    </div>
  );
}
