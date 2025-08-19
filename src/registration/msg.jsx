import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Message() {
    const navigate = useNavigate()
    const handleLogin = () =>{
        navigate('/login')
    }

    return (
         <div className="bg-green-50 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
       

        <h2 className="text-2xl font-bold text-green-600 mb-2">
          Registration Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Your account has been created successfully. You can now log in to
          continue.
        </p>

        <button
          onClick={handleLogin}
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Login
        </button>
      </div>
    </div>
    )

}

export default Message;