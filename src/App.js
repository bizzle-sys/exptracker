import "./App.css";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PrivateRoute } from "./components/private-route/PrivateRoute";

function App() {
  return (
    <div className="wrapper">
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
      <ToastContainer />
    </div>
  );
}

export default App;
