import React from 'react';

// Define el componente Change
export default function Change() {
  return (
    <div className="max-w-[567px] w-full  p-8">
      <p className="text-3xl leading-9">Change Component</p>

      <form className="mt-8">
        <div className="mb-4">
          <label htmlFor="currentGoogle" className="block text-lg mb-2">Current Google</label>
          <input
            type="text"
            id="currentGoogle"
            className="border-2 rounded-full border-black w-full p-2 mb-2"
            placeholder="Enter new Google"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="newGoogle" className="block text-lg mb-2">New Google</label>
          <input
            type="text"
            id="newGoogle"
            placeholder="Enter new Google"
            className="border-2 rounded-full border-black w-full p-2 mb-4"
          />
        </div>

        <div className="text-right">
          <button
            type="button"
            className="bg-[#1E8357] text-white px-4 py-2 rounded-full inline-block"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
