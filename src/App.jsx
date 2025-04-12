import Home from "./components/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Courses from "./Courses/Courses";
import SignUp from "./components/SignUp";

import { Toaster } from "react-hot-toast";
import { useAuth } from "./store/AuthProvider";
import AddBooks from "./AddBooks/AddBooks";

// ✅ Import your new pages when needed


function App() {
  const { authUser, isHost } = useAuth(); // ✅ Use isHost from context

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/course"
          element={authUser ? <Courses /> : <Navigate to="/signUp" />}
        />
        <Route path="/signUp" element={<SignUp />} />
        <Route
          path="/add-book"
          element={isHost ? <AddBooks /> : <Navigate to="/" />}
        />

        {/* ✅ Add more routes as needed */}

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
