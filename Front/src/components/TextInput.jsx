import React from 'react';

const TextInput = ({ labelName, input, placeholderText, error, value, onChange }) => {
  return (
    <div>
      <label className="flex flex-col mx-auto my-auto mb-3 text-center font-[700] text-[18px]">
        {labelName}
      </label>
      {input ? (
        <input
          className={`p-2 w-full h-[50px] mb-[10px] text-center border-[2px] border-solid border-[#050522] rounded-[10px] box-border shadow-md text-[14px] italic bg-[#F2FBE7] focus: outline-none ${error ? 'border-[#ea3354] focus:border focus:border-solid focus:border-[#ea3354]' : 'focus:border focus:border-solid focus:border-[#86a17c]'}`}
          placeholder={placeholderText}
          value={value}
          onChange={onChange}
        />
      ) : (
        <textarea
          className={`p-2 w-full mb-[10px] text-center border-[2px] border-solid border-[#050522] rounded-[10px] box-border shadow-md text-[14px] italic bg-[#F2FBE7] focus: outline-none ${error ? 'border-[#ea3354] focus:border focus:border-solid focus:border-[#ea3354]' : 'focus:border focus:border-solid focus:border-[#86a17c]'}`}
          placeholder={placeholderText}
          value={value}
          onChange={onChange}
        ></textarea>
      )}
      <span className="block h-5 mb-1 text-[#ea3354] text-[14px]">{error}</span>
    </div>
  );
};

export default TextInput;
