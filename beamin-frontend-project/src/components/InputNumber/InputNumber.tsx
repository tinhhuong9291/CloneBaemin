'use client';

import { useState } from 'react';

const InputNumber: React.FC = () => {
  const [value, setValue] = useState<number>(1);
  const decreaseQuantity = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const increaseQuantity = () => {
    if (value < 100) {
      setValue(value + 1);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={decreaseQuantity}
        type="button"
        className="ml-2 h-[40px] rounded-md border border-gray-400 px-3 text-2xl"
      >
        -
      </button>
      <input
        type="text"
        className="mx-2 h-[40px] w-14 rounded-md border border-gray-300 bg-white text-center outline-none"
        value={value}
        readOnly
        name="quantity"
      />
      <button
        onClick={increaseQuantity}
        type="button"
        className="h-[40px] rounded-md border border-gray-400 px-3 text-2xl leading-[37px]"
      >
        +
      </button>
    </div>
  );
};

export default InputNumber;
