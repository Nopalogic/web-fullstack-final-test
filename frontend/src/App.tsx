import { Route, Routes } from "react-router";

import LoginPage from "./pages/login";

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<div>Hello World</div>} />
    </Routes>
  );
}

export default App;
