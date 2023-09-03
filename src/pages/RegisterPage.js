import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../auth/LoginSlice";

const RegisterPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8080/register", {
        name,
        username,
        password,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/login");
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (localStorage.getItem("username") === null) {
      navigate("/register");
    } else {
      dispatch(loginSuccess(localStorage.getItem("username")));
    }
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center bg-slate-100 overflow-hidden"
      style={{ height: "100vh", width: "100vw" }}
    >
      <span className="text-4xl font-bold uppercase mb-4">Register</span>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4 w-[15%]"
      >
        <div className="flex flex-col items-start justify-between gap-1 w-full">
          <span className="text-lg font-semibold">Name</span>
          <input
            className="border rounded p-1 w-full"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
