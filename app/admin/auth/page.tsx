"use client";

import { loginAction } from "@/app/actions";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      {/* Bind the Server Action to the form */}
      <form action={handleSubmit} className="border border-gray-800 py-6 px-6">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex flex-col mb-4">
          <label className="text-gray-800">Email</label>
          <input 
            name="email" // MUST HAVE NAME ATTRIBUTE
            type="email" 
            className="border border-gray-400 py-4 px-4 text-gray-800"
            placeholder="Email" 
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-gray-800">Password</label>
          <input 
            name="password" // MUST HAVE NAME ATTRIBUTE
            type="password" 
            className="border border-gray-400 py-4 px-4 text-gray-800"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="py-4 px-4 bg-gray-500 text-white w-full mt-2">
          Login
        </button>
      </form>
      
    </div>
  );
}