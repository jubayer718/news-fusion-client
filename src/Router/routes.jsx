import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Home/Home";
import AddArticles from "../AllComponents/Add Articles/AddArticles";
import AllArticles from "../AllComponents/AllArticles/AllArticles";
import Subscription from "../AllComponents/Subscription/Subscription";
import MyArticles from "../AllComponents/MyArticles/MyArticles";
import PremiumArticles from "../AllComponents/PremiumArticles/PremiumArticles";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Dashboard from "../Dashboard/Dashboard";
import AllUsers from "../Dashboard/AllUsers";
import AddPublisher from "../Dashboard/AddPublisher";

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      }, {
        path: 'addArticles',
        element:<PrivateRoute><AddArticles></AddArticles></PrivateRoute>
      }, {
        path: 'allArticles',
        element:<AllArticles></AllArticles>
      }, {
        path: 'subscription',
        element:<Subscription></Subscription>
      },
      {
        path: 'login',
        element: <Login></Login>,
        
      },{
        path: 'register',
        element:<Register></Register>
      },{
        path: 'myArticles',
        element:<MyArticles></MyArticles>
      }, {
        path: 'premiumArticles',
        element:<PremiumArticles></PremiumArticles>
      }
    ]
  }, {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'allUsers',
        element:<AllUsers></AllUsers>
      },
      {
        path: 'allArticles',
        element:<AllArticles></AllArticles>
      }, {
        path: 'addPublishers',
        element:<AddPublisher></AddPublisher>
      }
    ]
  }
])