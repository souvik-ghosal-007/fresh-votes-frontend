import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../auth/LoginSlice";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [invalid, setInvalid] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const res = await axios.post("http://localhost:8080/login", formData);

      if (res.status === 200) {
        console.log(res.data);
        setInvalid(false);

        localStorage.setItem("username", username);

        dispatch(loginSuccess(localStorage.getItem("username")));
        navigate("/");
      }
    } catch (err) {
      console.error(err.message);
      setInvalid(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("username") !== null) {
      dispatch(loginSuccess(localStorage.getItem("username")));
      navigate("/");
    }
  });

  return (
    <div
      className="flex flex-col items-center justify-center bg-slate-100 overflow-hidden"
      style={{ height: "100vh", width: "100vw" }}
    >
      <span className="text-4xl font-bold uppercase mb-4">Login</span>

      {invalid && (
        <span className="text-lg text-red-500 mb-1">
          Invalid Username or Password
        </span>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4 w-[15%]"
      >
        <div className="flex flex-col items-start justify-between gap-1 w-full">
          <span className="text-lg font-semibold">Username</span>
          <input
            className="border rounded p-1 w-full"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col items-start justify-between gap-1 w-full">
          <span className="text-lg pr-2 font-semibold">Password</span>
          <input
            className="border rounded p-1 w-full"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white font-bold w-full rounded p-1 mt-3"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-black text-white font-bold w-full rounded p-1"
        >
          Create An Account
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
