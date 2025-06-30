import { Route, Routes } from "react-router";

import DashboardLayout from "./layouts/dashboard";
import LoginPage from "./pages/login";
import NotFound from "./pages/not-found";
import ProductPage from "./pages/product";
import ProductCreate from "./pages/product/create";
import ProductShow from "./pages/product/show";
import UserPage from "./pages/user";
import UserCreate from "./pages/user/create";
import UserShow from "./pages/user/show";

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />

      <Route element={<DashboardLayout />}>
        <Route path='/dashboard' element={<div>Hello Admin</div>} />

        <Route path='/dashboard/users' element={<UserPage />} />
        <Route path='/dashboard/users/create' element={<UserCreate />} />
        <Route path='/dashboard/users/:id' element={<UserShow />} />

        <Route path='/dashboard/products' element={<ProductPage />} />
        <Route path='/dashboard/products/create' element={<ProductCreate />} />
        <Route path='/dashboard/products/:id' element={<ProductShow />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
