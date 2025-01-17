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
import AdminRoute from "./AdminRoute/AdminRoute";
import AdminAllArticles from "../Dashboard/AdminAllArticle";
import ArticleDetails from "../pages/ArticleDetails/ArticleDetails";

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
        path: 'allArticle',
        element:<AllArticles></AllArticles>
      }, {
        path: 'subscription',
        element:<PrivateRoute><Subscription></Subscription></PrivateRoute>
      }, {
        path: 'articleDetails',
        element:<PrivateRoute><ArticleDetails></ArticleDetails></PrivateRoute>
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
        element:<PrivateRoute><PremiumArticles></PremiumArticles></PrivateRoute>
      }
    ]
  }, {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'allUsers',
        element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: 'allArticles',
        element:<AdminRoute><AdminAllArticles></AdminAllArticles></AdminRoute>
      }, {
        path: 'addPublishers',
        element:<AdminRoute><AddPublisher></AddPublisher></AdminRoute>
      }
    ]
  }
])