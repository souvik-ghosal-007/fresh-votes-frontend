import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, logout } from "../auth/LoginSlice";
import FormDialog from "../components/product/FormDialog";
import Product from "../components/product/Product";

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login.user);

  const [products, setProducts] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/");
  };

  const fetchData = () => {
    try {
      const data = JSON.parse(localStorage.getItem("user"));
      dispatch(loginSuccess(data));
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = () => {
    axios
      .get(`http://localhost:8080/users/${user.id}/products`)
      .then((res) => {
        const data = res.data;
        setProducts(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
    fetchProducts();
  }, [dispatch]);

  return (
    <div
      className="flex flex-col items-center bg-slate-100 overflow-y-scroll relative"
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <nav className="flex justify-around w-full py-3 items-center bg-white fixed">
        <span className="font-bold uppercase text-xl">Dashboard</span>

        <div className="flex gap-4 items-center">
          <AiFillHome
            size={18}
            onClick={() => navigate("/")}
            className="cursor-pointer"
          />
          <span className="font-bold capitalize">{user.name}</span>
          <span onClick={handleLogout} className="cursor-pointer">
            <LuLogOut size={18} />
          </span>
        </div>
      </nav>

      <div className="flex justify-between w-[60%] my-4 mt-[70px]">
        <FormDialog fetchData={fetchData} />
      </div>

      <div className="w-[60%]">
        {products.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center mt-36">
            No Products
          </div>
        ) : (
          <div>
            {products.map((product, index) => (
              <Product key={index} product={product} fetchData={fetchData} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
