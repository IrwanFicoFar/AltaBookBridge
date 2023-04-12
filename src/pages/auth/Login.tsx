import { FC } from "react";
import { Layout } from "../../components/Layout";
import { Input } from "../../components/Input";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Login: FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 bg-slate-100">
        {!isMobile && (
          <div className="">
            <img src="./bg.jpg" alt="" className="w-full h-full" />
          </div>
        )}
        <div className="flex  m-10 lg:m-10 justify-center items-center  dark:bg-slate-800  rounded-2xl">
          <form className="flex flex-col p-5 items-center shadow-lg bg-white gap-3 rounded-[5%]">
            <h1 className="font-bold text-3xl text-back dark:text-white">
              LOGIN
            </h1>
            <div>
              <label className="font-bold">Username</label>
              <Input
                placeholder="Insert your usernmae"
                id="input-uname"
                type="username"
              />
            </div>
            <div>
              <label className="font-bold">Password</label>
              <Input
                placeholder="Insert your password"
                id="input-password"
                type="password"
              />
            </div>
            <button className="py-2 px-4 m-2 w-full justify-center items-center gap-2 rounded-md border text-lg bg-@2A9D8F text-white font-bold shadow-sm align-middle hover:scale-105 focus:outline-none   transition-all text-md dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
              Log in
            </button>
            <p className="text-black dark:text-white">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-blue-700"
                id="nav-register "
              >
                {" "}
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
