import React from 'react';

const Privacy = () => {
  return (
    <div className="max-w-[567px] w-full bg-white p-8 mx-auto">
      <p className="text-3xl leading-9">Privacy of your account</p>

      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="publicCheckbox"
          className="form-checkbox h-6 w-6 rounded-full border-2 border-gray-400 cursor-pointer"
        />
        <label htmlFor="publicCheckbox" className="text-lg ml-2 whitespace-nowrap">
          Public
        </label>
      </div>
      <p className="text-sm mt-2">
        If your account is public, any person inside and outside Petgram will be able to see your profile.
      </p>

      <div className="flex items-center mt-10">
        <input
          type="checkbox"
          id="privateCheckbox"
          className="form-checkbox h-6 w-6 rounded-full border-2 border-gray-400 cursor-pointer"
        />
        <label htmlFor="privateCheckbox" className="text-lg ml-2 whitespace-nowrap">
          Private
        </label>
      </div>
      <p className="text-sm mt-2">
        If your account is private, only your followers will be able to see your profile.
      </p>
    </div>
  );
};

export default Privacy;
