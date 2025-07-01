import { Route, Routes } from "react-router";

import CashierLayout from "./layouts/cashier";
import DashboardLayout from "./layouts/dashboard";
import Dashboard from "./pages/dashboard";
import LoginPage from "./pages/login";
import NotFound from "./pages/not-found";
import { POSView } from "./pages/pos";
import ProductPage from "./pages/product";
import ProductCreate from "./pages/product/create";
import ProductShow from "./pages/product/show";
import SalesPage from "./pages/sale";
import UserPage from "./pages/user";
import UserCreate from "./pages/user/create";
import UserShow from "./pages/user/show";

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />

      <Route element={<DashboardLayout />}>
        <Route path='/dashboard' element={<Dashboard />} />

        <Route path='/dashboard/users' element={<UserPage />} />
        <Route path='/dashboard/users/create' element={<UserCreate />} />
        <Route path='/dashboard/users/:id' element={<UserShow />} />

        <Route path='/dashboard/products' element={<ProductPage />} />
        <Route path='/dashboard/products/create' element={<ProductCreate />} />
        <Route path='/dashboard/products/:id' element={<ProductShow />} />

        <Route path='/dashboard/sales' element={<SalesPage />} />
      </Route>

      <Route element={<CashierLayout />}>
        <Route path='/cashier' element={<POSView />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
