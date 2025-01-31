/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const AuthLayuts = (props) => {
  const { children, title, type } = props;
  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="w-full max-w-xs">
        <h1 className="text-3xl font-bold mb-2 text-blue-600">{title}</h1>
        <p className="font-medium text-slate-500 mb-8">Selamat Datang</p>
        {children}
        <p className="text-sm mt-5 text-center"></p>
      </div>
    </div>
  );
};

export default AuthLayuts;
