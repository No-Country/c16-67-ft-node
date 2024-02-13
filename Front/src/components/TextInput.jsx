import React from 'react';

const TextInput = ({ labelName, inputType, placeholderText, error }) => {
  return (
    <div>
      <label className="flex flex-col mx-auto my-auto text-center font-[700] text-[18px]">
        {labelName}
      </label>
      <input
        className="p-2 w-full mb-[10px] text-center border border-solid border-gray-300 rounded box-border shadow-md text-[18px] italic focus: outline-none "
        placeholder={placeholderText}
        type={inputType}
      />
      <span>{error}</span>
    </div>
  );
};

export default TextInput;
