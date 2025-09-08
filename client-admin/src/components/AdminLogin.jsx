// src/components/AdminLogin.jsx
import { useState } from "react";

const AdminLogin = ({ onLogin }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === import.meta.env.VITE_ADMIN_SECRET) {
      localStorage.setItem("admin_secret", input);
      onLogin();
    } else {
      alert("Wrong secret!");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Enter Admin Secret</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
