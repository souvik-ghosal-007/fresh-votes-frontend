import axios from "axios";
import React, { useEffect } from "react";
import { LuLogOut } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, logout } from "../auth/LoginSlice";

const HomePage = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.login.user);

  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };

  useEffect(() => {
    if (localStorage.getItem("username") !== null) {
      axios
        .get(`http://localhost:8080/users/${localStorage.getItem("username")}`)
        .then((res) => {
          dispatch(loginSuccess(res.data));

          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch((err) => console.error(err));
    } else {
      dispatch(logout());
      localStorage.clear();
    }
  }, []);

  return (
    <div
      className="flex flex-col items-center bg-slate-100"
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <nav className="flex justify-around w-full py-3 items-center bg-white fixed">
        <span className="font-bold uppercase text-xl">Fresh Votes</span>

        {isAuthenticated ? (
          <div className="flex flex-row gap-5 items-center">
            <div
              className="flex items-center px-2 py-1 rounded gap-1 bg-black cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              <MdDashboard size={18} color="white" />
              <span className="text-[15px] text-white font-semibold">
                Dashboard
              </span>
            </div>
            <span className="font-bold capitalize">{user.name}</span>
            <div className="cursor-pointer" onClick={handleLogout}>
              <LuLogOut size={18} />
            </div>
          </div>
        ) : (
          <div className="flex flex-row gap-5 items-center">
            <span onClick={() => navigate("/login")}>Login</span>
            <span onClick={() => navigate("/register")}>Register</span>
          </div>
        )}
      </nav>
    </div>
  );
};

export default HomePage;
