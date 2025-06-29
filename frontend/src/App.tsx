import { Route, Routes } from "react-router";

import DashboardLayout from "./layouts/dashboard";
import LoginPage from "./pages/login";

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<div>Hello World</div>} />

      <Route element={<DashboardLayout />}>
        <Route path='/dashboard' element={<div>Hello Admin</div>} />
      </Route>
    </Routes>
  );
}

export default App;
