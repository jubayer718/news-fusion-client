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
        element:<AddArticles></AddArticles>
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
  }
])