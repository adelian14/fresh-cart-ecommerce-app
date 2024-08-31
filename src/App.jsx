import React from 'react'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import About from './components/About/About'
import Categories from './components/Categories/Categories'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Notfound from './components/Notfound/Notfound'
import Register from './components/Register/Register'
import Brands from './components/Brands/Brands'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserContextProvider } from './Context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { RelatedProductContextProvider } from './Context/RelatedProductContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext'
import { CartCounterContextProvider } from './Context/CartCounterContext'
import { Toaster } from 'react-hot-toast'
import CheckOut from './components/CheckOut/CheckOut'
import Orders from './components/Orders/Orders'

let query = new QueryClient();

let routes = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/categories', element: <Categories /> },
      { path: '/brands', element: <Brands /> },
      { path: '/cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
      { path: '/checkout/:id', element: <ProtectedRoute> <CheckOut /> </ProtectedRoute> },
      { path: '/allorders', element: <ProtectedRoute> <Orders /> </ProtectedRoute> },
      { path: '/products', element: <Products /> },
      { path: '/productdetails/:id', element: <ProductDetails /> },
      { path: '/about', element: <About /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/*', element: <Notfound /> },
    ]
  }
]);


export default function App() {
  return <>
    <QueryClientProvider client={query}>
      <UserContextProvider>
        <RelatedProductContextProvider>
          <CartContextProvider>
            <CartCounterContextProvider>
              <RouterProvider router={routes}></RouterProvider>
              <ReactQueryDevtools />
              <Toaster position="top-right"/>
            </CartCounterContextProvider>
          </CartContextProvider>
        </RelatedProductContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </>
}
