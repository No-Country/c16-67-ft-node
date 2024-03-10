import React from 'react';

const TextInput = ({ labelName, input, placeholderText, error, value, onChange }) => {
  return (
    <div>
      <label className="flex flex-col mx-auto my-auto mb-3 text-center font-[700] text-[18px]">
        {labelName}
      </label>
      {input ? (
        <input
          className={`p-2 w-full h-[40px] mb-[10px] border-[1px] border-solid border-[#00000080] rounded-[8px] box-border shadow-md text-[16px] bg-[#FAFAFA] focus: outline-none md:h-[57px] md:text-[22px] ${error ? 'border-[#ea3354] focus:border focus:border-solid focus:border-[#ea3354]' : 'focus:border focus:border-solid focus:border-[#86a17c]'}`}
          placeholder={placeholderText}
          value={value}
          onChange={onChange}
        />
      ) : (
        <textarea
          className={`p-2 w-full mb-[10px] border-[1px] border-solid border-[#00000080] rounded-[8px] box-border shadow-md text-[16px] bg-[#FAFAFA] focus: outline-none md:h-[121px] md:text-[22px] resize-none ${error ? 'border-[#ea3354] focus:border focus:border-solid focus:border-[#ea3354]' : 'focus:border focus:border-solid focus:border-[#86a17c]'}`}
          placeholder={placeholderText}
          value={value}
          onChange={onChange}
        ></textarea>
      )}
    </div>
  );
};

export default TextInput;
