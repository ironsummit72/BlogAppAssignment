import { useEffect } from "react";

import { Outlet } from "react-router-dom";

import axiosInstance from "./axios/axiosInstance";
import { useDispatch } from "react-redux";
import { authenticateUser, logout } from "./redux/slice/slice";
import Navbar from "./components/custom/Navbar";



function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    axiosInstance
      .get("/getcurrentuser")
      .then((res) => {
        console.log(res.data.data,"userdata");
        const dataUser = res.data.data;
        if (dataUser) {
          dispatch(authenticateUser(dataUser));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(logout());
      });
  }, []);
  return <>
  <Navbar/>
      <Outlet/>
  </>;
}

export default App;
