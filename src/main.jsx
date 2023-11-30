import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home.jsx';
import Private from './Components/firebase config/Private.jsx';
import Login from './Pages/Login.jsx';
import EmployeeSinup from './Pages/EmployeeSinup.jsx';
import AdminSingup from './Pages/AdminSingup.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Asset from './Pages/Admin pages/Asset.jsx';
import AddAsset from './Pages/Admin pages/AddAsset.jsx';
import AddEmployee from './Pages/Admin pages/AddEmployee.jsx';
import AdminPrivate from './Components/firebase config/Adminprivate.jsx';
import CustomReq from './Pages/Employee/CustomReq.jsx';
import MyAsset from './Pages/Employee/MyAsset.jsx';
import ReqAsset from './Pages/Employee/ReqAsset.jsx';
import AllRequests from './Pages/Admin pages/AllRequests.jsx';
import CustomReqests from './Pages/Admin pages/CustomReqests.jsx';
import Profile from './Pages/Admin pages/Profile.jsx';
import Update from './Pages/Admin pages/Update.jsx';
import MyEmployee from './Pages/Admin pages/MyEmployee.jsx';
import Myteam from './Pages/Employee/Myteam';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from './Hook/PrivateRoute.jsx';
import Payment from './Pages/Payment Page/Payment.jsx';
import ErrorElement from './Components/ErrorElement.jsx';
const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement:<ErrorElement></ErrorElement>,
    children:[
      {
        path: "/",
        element:<Home></Home>
      },
      {
        path: "/Login",
        element:<Login></Login>
      },
      {
        path: "/Employee",
        element:<EmployeeSinup></EmployeeSinup>
      },
      {
        path: "/CustomReq",
        
        element:<PrivateRoute><CustomReq></CustomReq></PrivateRoute>
      },
      {
        path: "/MyAsset",
        element:<PrivateRoute><MyAsset></MyAsset></PrivateRoute>
      },
      {
        path: "/AssetRequest",
        element:<PrivateRoute><ReqAsset></ReqAsset></PrivateRoute>
      },
      {
        path: "/MyTeam",
        element:<PrivateRoute><Myteam></Myteam></PrivateRoute>
      },
      {
        path: "/Hr",
        element:<AdminSingup></AdminSingup>
      },
      {
        path: "/Asset",
        element:<AdminPrivate><Asset></Asset></AdminPrivate>
      },
      {
        path: "/AddAsset",
        element:<AdminPrivate><AddAsset></AddAsset></AdminPrivate>
      },
      {
        path: "Paymet",
        element:<AdminPrivate><Payment></Payment></AdminPrivate>,
      },
      {
        path: "/AddEmployee",
        element:<AdminPrivate><AddEmployee></AddEmployee></AdminPrivate>
      },
      {
        path: "/Allrequests",
        element:<AdminPrivate><AllRequests></AllRequests></AdminPrivate>
      },
      {
        path: "/UpdateAssetByAdmin/:_id",
        element:<AdminPrivate><Update></Update></AdminPrivate>,
        loader: ({params}) => fetch(`https://asset-server-side.vercel.app/Asset/${params._id}`)
      },
      {
        path: "/CustomRequests",
        element:<AdminPrivate><CustomReqests></CustomReqests></AdminPrivate>
      },
      {
        path: "/MyEmployee",
        element:<AdminPrivate><MyEmployee></MyEmployee></AdminPrivate>
      },
      {
        path: "/Profile",
        element:<PrivateRoute><Profile></Profile></PrivateRoute>
      },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
      <HelmetProvider>
    <Private>
     <RouterProvider router={router} />
    </Private>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
