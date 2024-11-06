import React from 'react'

export const Footer = () => {
  return (
    <nav className="relative w-full">
      <div className="w-[90%] mx-auto flex justify-between items-center py-6">
        <h1 className="font-extrabold text-4xl font-nunito text-green-600 ">
          Locked
          <span className="bg-orange-500 rounded-[7px] px-1 text-white">
            In
          </span>
        </h1>
      </div>
    </nav>
  );
}
