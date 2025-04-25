import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../components/pages/About/About";
import Home from "../components/pages/Home/Home";
import Login from "../components/pages/Login/Login";
import Signup from "../components/pages/Signup/Signup";
import PostItem from "../components/PostItem.jsx/PostItem";
import Order from "../components/Order/Order";
import Admin from "../components/Admin/Admin";
import Cart from "../components/Cart/Cart";
import Explore from "../components/ExploreMore/Explore";
import RouterProtector from "../components/RouterProtector/RouterProtector";
import BuyPage from "../components/Order/BuyPages";
import UserProfile from "../components/pages/UserProfile/UserProfile";

const router = createBrowserRouter([
       {
              path : "/",
              element : <App/>,
              children:[
                     {
                            path : "/about",
                            element : <About/>
                     },
                     {
                            path : "/",
                            element : <Home/>
                     },
                     {
                            path : "/product/:postId",
                            element : <PostItem/>
                     },
                     {
                            path : "/order-page",
                            element :<RouterProtector><Order/></RouterProtector> 
                     },
                     {
                            path : "/buy/:id",
                            element :<RouterProtector><BuyPage/></RouterProtector> 
                     },
                     {
                            path : "/cart",
                            element : <RouterProtector> <Cart/></RouterProtector>
                     },
                     {
                            path : "/profile/:id",
                            element : <RouterProtector> <UserProfile/></RouterProtector>
                     },
                     {
                            path : "/login",
                            element : <Login/>
                     },
                     {
                            path : "/signup",
                            element : <Signup/>
                     },
                     {
                            path : "/admin",
                            element : <RouterProtector><Admin/></RouterProtector> 
                     },
                     {
                            path : "/explore",
                            element : <Explore/>
                     },
                     {
                            path : "/explore/:name",
                            element : <Explore/>
                     },
              ]
       },
       
       
       
])
export default router