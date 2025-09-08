// src/App.jsx
import { useState } from "react";
import AdminLogin from "./components/AdminLogin";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("admin_secret")
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {loggedIn ? (
        <h1 className="text-2xl p-8">Welcome to Admin Panel</h1>
      ) : (
        <AdminLogin onLogin={() => setLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
