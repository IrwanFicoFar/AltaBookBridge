import { FC, FormEvent, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { UserEdit } from "../utils/user";
import axios from "axios";

const ProfileUser: FC = () => {
  const [objSubmit, setObjSubmit] = useState<Partial<UserEdit>>({});
  const [data, setData] = useState<Partial<UserEdit>>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const params = useParams();
  const navigate = useNavigate();
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    const { username: uname } = params;
    axios
      .get(`users`)
      .then((response) => {
        const { data } = response.data;
        document.title = `${data.username} | Profile`;
        setData(data);
      })
      .catch((error) => {
        alert(error.toString());
      });
  }

  function handleChange(value: string | File, key: keyof typeof objSubmit) {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    let key: keyof typeof objSubmit;
    for (key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }
    axios
      .put("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { message } = response.data;
        Swal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        });
        setIsEdit(false);
        setObjSubmit({});
      })
      .catch((error) => {
        const { data } = error.response;
        Swal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => fetchData());
  }
  const handleDeleteAccount = () => {
    axios
      .delete("users", {
        headers: {
          Authorization: "",
        },
      })
      .then((response) => {
        const { message } = response.data;
        Swal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        });
      })
      .catch((error) => {
        const { data } = error.response;
        Swal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      });
  };

  return (
    <Layout>
      <div className="flex justify-center items-center bg-slate-100 dark:bg-slate-900">
        <div className="grid  md:max-w-60 lg:max-w-[100%] m-5 md:m-10 justify-start items-center  dark:bg-slate-800  rounded-2xl">
          <form className="flex flex-col md:w-96 p-5 justify-center items-center shadow-lg bg-white gap-3 rounded-large dark:bg-@264653">
            <div className="card w-48 h-48 bg-slate-300  rounded-full">
              <div className="p-6">
                <img
                  src="./user_icon.png"
                  alt={`${data.username}'s profile picture`}
                  // src="./user_icon.png"
                  // alt=""
                  className="h-36 w-36 border-spacing-5"
                />
              </div>
            </div>
            <div>
              <div>
                <p className="font-bold text-2xl">{data.name}</p>
              </div>
              <div>
                <p className="font-bold text-lg">{data.username}</p>
              </div>
            </div>
            <div className="flex w-full">
              <button
                type="button"
                className="py-2 px-4 m-2 w-full inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-@2A9D8F text-white hover:bg-@1F7168 focus:outline-none   transition-all text-sm dark:focus:ring-offset-gray-800"
                data-hs-overlay="#hs-medium-modal"
              >
                Edit Profile
              </button>
              <button
                id="button-delete-users"
                type="button"
                className="py-2 px-4 m-2 w-full inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-@E76F51 text-white hover:bg-@F4A261 focus:outline-none   transition-all text-sm dark:focus:ring-offset-gray-800"
                onClick={() => handleDeleteAccount()}
              >
                Delete
              </button>
              <div
                id="hs-medium-modal"
                className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
              >
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all md:max-w-2xl md:w-full m-3 md:mx-auto">
                  <form
                    className="flex flex-col p-5 items-center shadow-lg bg-white gap-3 rounded-large"
                    onSubmit={(event) => handleSubmit(event)}
                  >
                    <h1 className="uppercase font-bold text-3xl text-back dark:text-white">
                      Update Profile
                    </h1>
                    <div className="grid grid-cols-2 justify-center items-center">
                      <div className="card h-32 w-32 md:w-48 md:h-48 bg-slate-300 rounded-full">
                        <div className="p-6">
                          <img
                            src="./user_icon.png"
                            alt=""
                            className="w-20 h-20 md:h-36 md:w-36 border-spacing-5"
                          />
                        </div>
                      </div>
                      <div className="">
                        <label className="block">
                          <span className="sr-only">Choose profile photo</span>
                          <input
                            type="file"
                            className="block text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-@2A9D8F file:text-white
      hover:file:bg-@1F7168
    "
                            onChange={(event) => {
                              if (!event.currentTarget.files) {
                                return;
                              }
                              setData({
                                ...data,
                                image: URL.createObjectURL(
                                  event.currentTarget.files[0]
                                ),
                              });
                              handleChange(
                                event.currentTarget.files[0],
                                "image"
                              );
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="font-bold ">Name</label>
                      <Input
                        placeholder="Insert your full name"
                        id="input-uname"
                        type="name"
                        defaultValue={data.name}
                        onChange={(event) =>
                          handleChange(event.target.value, "name")
                        }
                      />
                    </div>
                    <div className="w-full">
                      <label className="font-bold">Username</label>
                      <Input
                        placeholder="Insert your username"
                        id="input-uname"
                        type="username"
                        className="border rounded-lg bg-slate-200 border-slate-400 text-black p-2 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 w-full"
                        disabled
                      />
                    </div>
                    <div className="w-full">
                      <label className="font-bold">Password</label>
                      <Input
                        placeholder="Insert your password"
                        id="input-password"
                        type="password"
                        defaultValue={data.password}
                        onChange={(event) =>
                          handleChange(event.target.value, "password")
                        }
                      />
                    </div>
                    <div>
                      <button
                        id="button-update-users"
                        type="submit"
                        className="py-2 px-4 m-2 w-full justify-center items-center gap-2 rounded-md border text-lg bg-@2A9D8F text-white font-bold shadow-sm align-middle hover:scale-105 focus:outline-none   transition-all text-md dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileUser;
{
  /* <form className="flex flex-col p-5 items-center shadow-lg bg-white gap-3 rounded-[5%]">
            <h1 className="uppercase font-bold text-3xl text-back dark:text-white">
              Update Profile
            </h1>
            <div className="grid md:grid-cols-2 justify-center items-center">
              <div className="card h-32 w-32 md:w-48 md:h-48 bg-slate-300 rounded-full">
                <div className="p-6">
                  <img
                    src="./user_icon.png"
                    alt=""
                    className="w-20 h-20 md:h-36 md:w-36 border-spacing-5"
                  />
                </div>
              </div>
              <div className="">
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    className="block text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-@2A9D8F file:text-white
      hover:file:bg-@1F7168
    "
                  />
                </label>
              </div>
            </div>
            <div className="w-full">
              <label className="font-bold ">Name</label>
              <Input
                placeholder="Insert your full name"
                id="input-uname"
                type="username"
              />
            </div>
            <div className="w-full">
              <label className="font-bold">Username</label>
              <Input
                placeholder="Insert your username"
                id="input-uname"
                type="username"
                className="border rounded-lg bg-slate-200 border-slate-400 text-black p-2 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 w-full"
                disabled
              />
            </div>
            <div className="w-full">
              <label className="font-bold">Password</label>
              <Input
                placeholder="Insert your password"
                id="input-password"
                type="password"
              />
            </div>
            <div>
              <button className="py-2 px-4 m-2 w-full justify-center items-center gap-2 rounded-md border text-lg bg-@2A9D8F text-white font-bold shadow-sm align-middle hover:scale-105 focus:outline-none   transition-all text-md dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                Update
              </button>
            </div>
          </form> */
}
