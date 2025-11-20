import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Archive from "./pages/Archive";
import PostPage from "./pages/PostPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/post/:id" element={<PostPage />} />


        {/* Future (single blog page) */}
        {/* <Route path="/post/:id" element={<PostDetails />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
