import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VerifyCode() {
  const [resetCode, setResetCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleVerifyCode(e) {
    e.preventDefault();
    try {
      await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { resetCode });
      navigate('/reset-password'); // ✅ هنا التعديل
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid code');
    }
  }

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-bold mb-6">Enter the reset code</h2>
      {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
      <form onSubmit={handleVerifyCode} className="max-w-md mx-auto">
        <input
          type="text"
          name="resetCode"
          placeholder="Enter reset code"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full text-white bg-green-700 hover:bg-green-800 px-4 py-2 rounded"
        >
          Verify
        </button>
      </form>
    </div>
  );
}
