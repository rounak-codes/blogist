import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "./components/AdminLogin";
import AdminLayout from "./components/AdminLayout";

import Dashboard from "./pages/Dashboard";
import PostsList from "./pages/PostsList";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

function App() {
  const loggedIn = !!localStorage.getItem("admin_secret");

  return (
    <BrowserRouter>
      <Routes>

        {!loggedIn && (
          <Route
            path="/*"
            element={<AdminLogin onLogin={() => window.location.reload()} />}
          />
        )}

        {loggedIn && (
          <Route path="/" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="posts" element={<PostsList />} />
            <Route path="create" element={<CreatePost />} />
            <Route path="edit/:id" element={<EditPost />} />

            <Route path="" element={<Navigate to="/dashboard" />} />
          </Route>
        )}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
