import { Route, Routes } from "react-router";

import DashboardLayout from "./layouts/dashboard";
import LoginPage from "./pages/login";
import UserPage from "./pages/user";
import UserCreate from "./pages/user/create";
import UserShow from "./pages/user/show";

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<div>Hello World</div>} />

      <Route element={<DashboardLayout />}>
        <Route path='/dashboard' element={<div>Hello Admin</div>} />

        <Route path='/dashboard/users' element={<UserPage />} />
        <Route path='/dashboard/users/create' element={<UserCreate />} />
        <Route path='/dashboard/users/:id' element={<UserShow />} />
      </Route>
    </Routes>
  );
}

export default App;
