import logo from './logo.svg';
import './App.scss';
import Home from './pages/Home';

import Products from './pages/Product';
import ErrorElement from './layouts/Error';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Cart from './pages/Cart';
import DetailProduct from './pages/Product/DetailProduct';
import Orders from './pages/Order';
import Profile from './pages/Account/Profile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:productId" element={<DetailProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/order" element={<Orders />} />
      <Route path="*" element={<ErrorElement />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
