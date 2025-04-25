import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setPosts, setUserInfo } from "./store/authSlice";
import { url } from "./components/bacxkendUrl/BackendUrl";
// import { useEffect } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setPosts, setUserInfo } from "../../../store/authSlice";
// import { url } from "../../bacxkendUrl/BackendUrl";
function App() {



  return (
    <div className="m-">
      <Toaster/>
        <Header />
        <main>
          <Outlet></Outlet>
        </main>
        <Footer />
      
    </div>
  );
}

export default App;
