import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ItemContext } from "../context/ItemContext";

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (password == "10cosmo96") {
      navigate("/items");
    } else {
      alert("Wrong Password");
    }
  };
  return (
    <div className="h-screen w-full flex items-center justify-center ">
      <div className="flex flex-col items-center w-1/3">
        <h1 className="m-5">Login to Cosmo</h1>
        <form
          className="h-40 flex flex-col items-center w-[80%]"
          onSubmit={submitHandler}
          onChange={(e) => setPassword(e.target.value)}
        >
          <input
            type="password"
            className="w-full p-2 border-2 border-red-300 rounded-lg m-5 focus:outline-none"
          />
          <button type="submit" className="bg-blue-500 p-2 rounded-lg">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
