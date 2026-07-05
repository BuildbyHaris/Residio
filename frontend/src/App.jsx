import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./modules/auth/pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect Home to Register */}
        <Route path="/" element={<Navigate to="/register" replace />} />

        {/* Register Page */}
        <Route path="/register" element={<Register />} />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <h2
              style={{
                textAlign: "center",
                marginTop: "50px",
                color: "red",
              }}
            >
              404 - Page Not Found
            </h2>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;