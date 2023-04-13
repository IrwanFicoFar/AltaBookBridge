import { FC, useState, useEffect, FormEvent } from "react";
import { Layout } from "../../components/Layout";
import { Input } from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

interface ObjSubmitType {
  username: string;
  password: string;
}

const Login: FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [objSubmit, setObjSubmit] = useState<ObjSubmitType>({
    username: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  // const [, setCookie] = useCookies();

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

  useEffect(() => {
    const isEmpty = Object.values(objSubmit).every((val) => {
      return val !== "";
    });
    setIsDisabled(!isEmpty);
  }, [objSubmit]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsDisabled(true);
    axios
      .post("login", objSubmit)
      .then((response) => {
        const { data, message } = response.data;
        Swal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      })
      .catch((error) => {
        const { data } = error.response;
        Swal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => setIsDisabled(false));
  }

  return (
    <Layout>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 bg-slate-100">
        {!isMobile && (
          <div className="">
            <img src="./bg.jpg" alt="" className="w-full h-full" />
          </div>
        )}
        <div className="flex  m-10 lg:m-10 justify-center items-center  dark:bg-slate-800  rounded-2xl">
          <form
            className="flex flex-col p-5 items-center shadow-lg bg-white gap-3 rounded-[5%]"
            onSubmit={(event) => handleSubmit(event)}
          >
            <h1 className="font-bold text-3xl text-back dark:text-white">
              LOGIN
            </h1>
            <div>
              <label className="font-bold">Username</label>
              <Input
                placeholder="Insert your username"
                id="input-uname"
                type="username"
                onChange={(event) =>
                  setObjSubmit({ ...objSubmit, username: event.target.value })
                }
              />
            </div>
            <div>
              <label className="font-bold">Password</label>
              <Input
                placeholder="Insert your password"
                id="input-password"
                type="password"
                onChange={(event) =>
                  setObjSubmit({ ...objSubmit, password: event.target.value })
                }
              />
            </div>
            <button
              id="button-login"
              type="submit"
              className="py-2 px-4 m-2 w-full justify-center items-center gap-2 rounded-md border text-lg bg-@2A9D8F text-white font-bold shadow-sm align-middle hover:scale-105 focus:outline-none   transition-all text-md dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              disabled={isDisabled}
            >
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
