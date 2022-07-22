import React from 'react';

export default function Loading(){
  return(
    <div className="flex min-h-screen">
      <div className="m-auto">     
        <div className="loader bg-white p-5 rounded-full flex space-x-3">
          <div className="w-5 h-5 bg-green-400 rounded-full animate-bounce"></div>
          <div className="w-5 h-5 bg-green-400 rounded-full animate-bounce"></div>
          <div className="w-5 h-5 bg-green-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}