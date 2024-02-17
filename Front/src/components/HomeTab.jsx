import React from 'react';

export default function HomeTab({ setTabActive }) {
  return (
    <div className="flex h-12">
      <div
        className="flex-grow basis-0 text-center h-full flex items-center justify-center text-blue-500 border-blue-500 border-b-2"
        onClick={() => setTabActive('Feed')}
      >
        Feed
      </div>
      <div
        className="flex-grow basis-0 text-center h-full flex items-center justify-center border-gray-300 border-b-2"
        onClick={() => setTabActive('Lost-Adption')}
      >
        Lost/In adoption
      </div>
    </div>
  );
}
