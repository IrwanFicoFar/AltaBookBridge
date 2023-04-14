import { FC, useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

import { Input, TextArea } from "../components/Input";
import { Layout } from "../components/Layout";
import { BookType } from "../utils/user";

const UploadBook: FC = () => {
  const [falseUsername, setFalseUsername] = useState<boolean>(false);
  const [bookSubmit, setBookSubmit] = useState<Partial<BookType>>({});
  const [data, setData] = useState<Partial<BookType>>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [cookie] = useCookies(["token", "uname"]);
  const checkToken = cookie.token;
  const params = useParams();
  const navigate = useNavigate();

  document.title = `Detail Book | Book Management`;

  const checkUname = "username123";

  //karena balikan uname undefined, jdi gk bisa dipakai dlu skema ini,ini hanya contoh saja
  const { username } = params;
  // untuk contoh restriksinya pakai token aja jadinya

  useEffect(() => {
    setFalseUsername(true);
  }, []);

  useEffect(() => {
    fetchDetailBook();
  }, []);

  function fetchDetailBook() {
    axios
      .get(`/books/booksID`)
      .then((response) => {
        const { data } = response.data;
        document.title = `${data.title}`;
        setData(data);
      })
      .catch((error) => {
        alert(error.toString());
      });
  }

  function handleChange(value: any, key: keyof typeof bookSubmit) {
    let temp = { ...bookSubmit };
    temp[key] = value;
    setBookSubmit(temp);
  }

  function handleSubmitBook(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const formData = new FormData();
    let key: keyof typeof bookSubmit;
    for (key in bookSubmit) {
      formData.append(key, bookSubmit[key] as string);
    }
    axios
      .put("/books/booksID", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${data}`,
        },
      })
      .then((response) => {
        const { message } = response.data;
        Swal.fire({
          icon: "success",
          title: "Success",
          text: message,
          showCancelButton: false,
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            setBookSubmit({});
            handleChangeEdithFalse();
            window.location.reload();
          }
        });
      })
      .catch((error) => {
        const { data } = error;
        if (data === undefined) {
          Swal.fire({
            icon: "error",
            title: "data is empty, Please fill etlist one",
            showCancelButton: false,
          });
        }
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => fetchDetailBook());
  }
  const handleDeleteBook = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("books/booksID", {
            headers: {
              Authorization: "",
            },
          })
          .then(() => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          })
          .catch((error) => {
            const { data } = error.response;
            Swal.fire({
              icon: "error",
              title: "Failed",
              text: data.message,
              showCancelButton: false,
            });
          });
      }
    });
  };

  const handleChangeEdith = () => {
    setIsEdit(true);
  };
  const handleChangeEdithFalse = () => {
    setIsEdit(false);
  };

  return (
    <Layout>
      <div className="flex justify-center items-center bg-slate-100 dark:bg-slate-800">
        <div className="grid  md:max-w-60 lg:max-w-[50%] col-span-2 m-5 md:m-10 justify-start items-center  dark:bg-slate-800  rounded-2xl">
          <form className="flex flex-col p-5 justify-center items-center shadow-lg bg-white dark:bg-@264653 gap-3 rounded-large">
            <h1 className="uppercase font-bold text-3xl text-back dark:text-white">
              Detail Books
            </h1>
            <div className="grid md:grid-cols-2">
              <div className="flex p-2 justify-center items-center">
                <img
                  src="./download.jpeg"
                  alt=""
                  className="w-64 h-80 rounded-[5%]"
                />
              </div>
              <div className="flex flex-col">
                <div className="w-full">
                  <label className="font-bold dark:text-white">Title</label>
                  <p className="uppercase font-bold text-xl dark:text-white">
                    {data.title}
                  </p>
                </div>
                <div className="w-full h-60">
                  <label className="font-bold dark:text-white">
                    Description
                  </label>
                  <p className="text-sm leading-4 dark:text-white">
                    {data.description}
                  </p>
                </div>
                <div className="flex w-full">
                  {checkUname === username && checkToken ? (
                    <button
                      type="button"
                      className="py-2 px-4 m-2 w-full justify-center items-center gap-2 rounded-md border text-md bg-@2A9D8F text-white font-bold shadow-sm align-middle hover:scale-105 focus:outline-none   transition-all text-md dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                      data-hs-overlay="#hs-medium-modal"
                      onClick={() => handleChangeEdith()}
                    >
                      Edit Book
                    </button>
                  ) : (
                    <></>
                  )}
                  {checkUname === username && checkToken ? (
                    <button
                      type="button"
                      className="py-2 px-4 m-2 w-full justify-center items-center gap-2 rounded-md border text-md bg-@E76F51 text-white font-bold shadow-sm align-middle hover:scale-105 focus:outline-none   transition-all text-md dark:bg-@E76F51 dark:hover:bg-@F4A261 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                      onClick={() => handleDeleteBook()}
                    >
                      Delete
                    </button>
                  ) : (
                    <></>
                  )}
                  {isEdit && (
                    <div
                      id="hs-medium-modal"
                      className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
                    >
                      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all md:max-w-2xl md:w-full m-3 md:mx-auto">
                        <form className="flex flex-col p-5 items-center shadow-lg bg-white dark:bg-@264653 gap-3 rounded-large">
                          <h1 className="uppercase font-bold text-3xl text-back dark:text-white">
                            Update Books
                          </h1>
                          <div className="grid md:grid-cols-2 justify-center">
                            <div className="">
                              <div className="p-2">
                                <img
                                  src={
                                    bookSubmit.book_image
                                      ? URL.createObjectURL(
                                          bookSubmit.book_image
                                        )
                                      : "./download.jpeg"
                                  }
                                  alt=""
                                  className="w-64 h-80 rounded-[5%]"
                                />
                              </div>
                              <div className="p-2 w-40">
                                <label className="block">
                                  <span className="sr-only">
                                    Choose profile photo
                                  </span>
                                  <Input
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
                                        book_image: URL.createObjectURL(
                                          event.currentTarget.files[0]
                                        ),
                                      });
                                      handleChange(
                                        event.currentTarget.files[0],
                                        "book_image"
                                      );
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                              <div className="w-full">
                                <label className="font-bold dark:text-white">
                                  Title
                                </label>
                                <Input
                                  placeholder="Insert title book"
                                  id="title_book"
                                  type="text"
                                  defaultValue={data.title}
                                  onChange={(event) =>
                                    handleChange(event.target.value, "title")
                                  }
                                />
                              </div>
                              <div className="w-full py-3 ">
                                <label className="font-bold dark:text-white">
                                  Description
                                </label>
                                <TextArea
                                  placeholder="Book's descriptions...."
                                  id="desc_book"
                                  defaultValue={data.description}
                                  onChange={(event) =>
                                    handleChange(
                                      event.target.value,
                                      "description"
                                    )
                                  }
                                />
                              </div>
                              <div className="w-fit">
                                <button
                                  type="submit"
                                  className="py-1 px-2 m-1 justify-center items-center gap-2 rounded-md border text-lg bg-@2A9D8F text-white font-semibold shadow-sm align-middle hover:scale-105 focus:outline-none   transition-all text-md dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                                  onClick={(event) => {
                                    handleSubmitBook(event);
                                  }}
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UploadBook;
