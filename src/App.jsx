import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Auth from "./components/Auth";
import Home from "./components/Home";
import EditPaste from "./components/EditPaste";
import ProtectedRoute from "./components/ProtectedRoute";
import AllPaste from "./components/AllPaste";
import ViewPaste from "./components/ViewPaste";
import YourPaste from "./components/YourPaste";
import About from "./components/About";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <NavBar />
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/NewPaste"
          element={
            <ProtectedRoute>
              <NavBar />
              <EditPaste />
            </ProtectedRoute>
          }
        />
         <Route
          path="/AllPaste"
          element={
            <ProtectedRoute>
              <NavBar />
              <AllPaste />
            </ProtectedRoute>
          }
        />
          <Route
          path="/view/:id"
          element={
          <>
              <NavBar />
              <ViewPaste />
   </>
          }
        />

          <Route
          path="/yourPaste"
          element={
            <ProtectedRoute>
              <NavBar />
              <YourPaste/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/about"
          element={
            <ProtectedRoute>
              <NavBar />
              <About/>
            </ProtectedRoute>
          }
        />
        <Route path="/edit/:id" element={<ProtectedRoute>
              <NavBar /><EditPaste /> </ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
