import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Verify from './pages/Verify';
import VerifyEmail from './pages/VerifyEmail';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import AdminSales from './pages/Admin/AdminSales';
import AddProduct from './pages/Admin/AddProduct';
import ShowUserOrders from './pages/Admin/ShowUserOrders';
import AdminUsers from './pages/Admin/AdminUsers';
import UserInfo from './pages/Admin/UserInfo';
import AdminProduct from './pages/Admin/AdminProduct';
import AdminOrders from './pages/Admin/AdminOrders';
import ProtectedRoutes  from './components/ProtectedRoutes';
import SingleProduct from './pages/SingleProduct';
import AddressForm from './pages/AddressForm';
import OrderSuccess from './pages/OrderSuccess';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from './pages/ResetPassword';


const router = createBrowserRouter([
  {
    path:'/',
    element:<><Navbar/><Home/><Footer/></>
  },
  {
    path:'/signup',
    element:<><Signup/></>
  },

  {
    path:'/login',
    element:<><Login/></>
  },
  {
    path:'/verify',
    element:<><Verify/></>
  },
  {
    path:'/verify/:token',
    element:<><VerifyEmail/></>
  },

  {
  path: '/forgot-password',
  element: <><ForgotPassword /></>
 },
 {
  path: "/verify-otp",
  element: <VerifyOTP />,
  },
 
   {
  path: '/reset-password',
  element: <ResetPassword />,
 },
   
  
  {
    path:'/products',
    element:<><Navbar/><Products/><Footer/></>
  },

  {
    path:'/products/:id',
    element:<><Navbar/><SingleProduct/> <Footer /></>
  },
  {
    path:'/profile/:userId',
    element:(<ProtectedRoutes ><><Navbar/><Profile/></></ProtectedRoutes >)
  },

  {
    path:'/cart',
    element:(<ProtectedRoutes><><Navbar/><Cart/><Footer /></></ProtectedRoutes>)
  },
  {
    path:'/address',
    element:(<ProtectedRoutes><> <Navbar /><AddressForm/></></ProtectedRoutes>)
  },
  {
    path:'/order-success',
    element:(<ProtectedRoutes><><Navbar /><OrderSuccess/></></ProtectedRoutes>)
  },


  
  {
   path:'/dashboard',
    element:<ProtectedRoutes adminOnly={true}><><Navbar/><Dashboard/></></ProtectedRoutes>,
    children:[
      {
        index:true,
        element: <AdminSales/>,
      },
       {
        path: "sales",
        element: <AdminSales />,
      },

       {
        path:"add-product",
        element: <AddProduct/>,
      },
      {
        path:"product",
        element: <AdminProduct/>
      },
      {
        path:"orders",
        element: <AdminOrders/>
      },
      {
        path:"users",
        element: <AdminUsers/>
      },
      
       
       {
        path:"users/:id",
        element: <UserInfo/>
      },
      {
        path:"users/orders/:userId",
        element: <ShowUserOrders/>
      },
    ]
  }
])

export const App = () => {
  return (
    <>
<RouterProvider router={router} />
    </>
  )
};
export default App;