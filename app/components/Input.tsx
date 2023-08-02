//Rendering the component on client side
'use client';

//Dependency Imports
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

interface InputProps {
  fetchLocationKeypress: (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => void;
  fetchLocationClick: (
    event: React.MouseEvent<HTMLInputElement>
  ) => void;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({
  fetchLocationKeypress,
  setLocation,
  fetchLocationClick,
}: InputProps) => {
  return (
    <form className="flex items-center md:w-2/4 w-full">
      <input
        type="text"
        placeholder="Search City"
        className="w-full md:my-0 outline-none bg-transparent border-b-2 border-white/50 placeholder-white/75 text-lg text-white p-4"
        onKeyDown={fetchLocationKeypress}
        onChange={(event) => setLocation(event.target.value)}
      />
      <div className="-ml-10 text-white hover:text-white/75 cursor-pointer">
        <AiOutlineSearch size={32} onClick={fetchLocationClick} />
      </div>
    </form>
  );
};

export default Input;
