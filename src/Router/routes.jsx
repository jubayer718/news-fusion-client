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
import AllUsers from "../Dashboard/alluser/AllUsers";
import AddPublisher from "../Dashboard/AddPublisher";
import AdminRoute from "./AdminRoute/AdminRoute";
import AdminAllArticles from "../Dashboard/AdminAllArticle";
import ArticleDetails from "../pages/ArticleDetails/ArticleDetails";
import PaymentPage from "../pages/PaymentPage";
import UpdateArticle from "../pages/UpdateArticle/UpdateArticle";
import ErrorPage from "../pages/Error/ErrorPage";
import MyProfile from "../pages/myProfile/MyProfile";
import AdminHome from "../Dashboard/AdminHome";
import UpdateProfilePage from "../pages/UpdateProfilePage";

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },{
        path: 'allArticle',
        element: <AllArticles></AllArticles>,
       
      }, {
        path: 'addArticles',
        element:<PrivateRoute><AddArticles></AddArticles></PrivateRoute>
      }, 
      {
        path: 'payment',
        element:<PrivateRoute><PaymentPage></PaymentPage></PrivateRoute>
      },{
        path: 'subscription',
        element:<PrivateRoute><Subscription></Subscription></PrivateRoute>
      }, {
        path: 'articleDetails/:id',
        element: <PrivateRoute><ArticleDetails></ArticleDetails></PrivateRoute>,
        loader:({params})=>fetch(`http://localhost:9000/articles/${params.id}`) 
      },
      {
        path:'articleUpdate/:id',
        element: <PrivateRoute><UpdateArticle></UpdateArticle></PrivateRoute>,
         loader:({params})=>fetch(`http://localhost:9000/articles/${params.id}`) 
      },
      {
        path: "myProfile",
        element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
      },
      {
        path: 'updateProfile/:email',
        element: <PrivateRoute><UpdateProfilePage></UpdateProfilePage></PrivateRoute>,
        loader:({params})=>fetch(`http://localhost:9000/users/update/${params.email}`)
      }
      ,
      {
        path: 'login',
        element: <Login></Login>,
        
      },{
        path: 'register',
        element:<Register></Register>
      },{
        path: 'myArticles',
        element:<PrivateRoute><MyArticles></MyArticles></PrivateRoute>
      }, {
        path: 'premiumArticles',
        element:<PrivateRoute><PremiumArticles></PremiumArticles></PrivateRoute>
      }
    ]
  }, {
    path: '/dashboard',
    element:<AdminRoute> <Dashboard></Dashboard></AdminRoute>,
    children: [
      {
        path: 'adminHome',
        element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
    }
      ,
      {
        path: 'allUsers',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
        loader:()=>fetch(`http://localhost:9000/usersCount`)
      },
      {
        path: 'allArticles',
        element: <AdminRoute><AdminAllArticles></AdminAllArticles></AdminRoute>,
         loader: () => fetch(`http://localhost:9000/articleCount`)
      }, {
        path: 'addPublishers',
        element:<AdminRoute><AddPublisher></AddPublisher></AdminRoute>
      }
    ]
  }
])