import { FC, useState, useEffect, FormEvent } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import { Input, TextArea } from "../components/Input";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { uploadBookType } from "../utils/user";

const UploadBook: FC = () => {
  const [bookSubmit, setBookSubmit] = useState<uploadBookType>({
    title: "",
    description: "",
    book_image: "",
  });
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  document.title = `Upload Book | Book Management`;

  useEffect(() => {
    const isEmpty = Object.values(bookSubmit).every((val) => {
      return val !== "";
    });
    setIsDisabled(!isEmpty);
  }, [bookSubmit]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsDisabled(true);
    axios
      .post(`books`, bookSubmit)
      .then((response) => {
        const { data, message } = response.data;
        Swal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/books");
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
      <div className="flex justify-center items-center bg-slate-100 dark:bg-slate-900">
        <div className="grid col-span-2 m-5 md:m-10 justify-start items-center  dark:bg-slate-800  rounded-2xl">
          <form
            className="flex flex-col p-5 items-center shadow-lg bg-white gap-3 rounded-large dark:bg-@264653"
            onSubmit={(event) => handleSubmit(event)}
          >
            <h1 className="uppercase font-bold text-3xl text-back dark:text-white ">
              Upload Books
            </h1>
            <div className="grid md:grid-cols-2 justify-center ">
              <div className="">
                <div className="p-2">
                  {bookSubmit.book_image ? (
                    <img
                      src={URL.createObjectURL(
                        new Blob([bookSubmit.book_image])
                      )}
                      alt=""
                      className="w-60 h-80 rounded-[5%]"
                    />
                  ) : (
                    <img
                      src="./download.jpeg"
                      alt=""
                      className="w-60 h-80 rounded-[5%]"
                    />
                  )}
                </div>
                <div className="p-2 w-40">
                  <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <Input
                      type="file"
                      className=" w-fit block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-@2A9D8F file:text-white hover:file:bg-@1F7168"
                      onChange={(event) =>
                        setBookSubmit({
                          ...bookSubmit,
                          book_image: event.target.files
                            ? event.target.files[0]
                            : "",
                        })
                      }
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center ">
                <div className="w-full">
                  <label className="font-bold dark:text-white">Title</label>
                  <Input
                    placeholder="Insert title book"
                    id="title_book"
                    type="text"
                    onChange={(event) =>
                      setBookSubmit({
                        ...bookSubmit,
                        title: event.target.value,
                      })
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
                    onChange={(event) =>
                      setBookSubmit({
                        ...bookSubmit,
                        description: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="w-fit">
                  <button
                    id="button-add-book"
                    type="submit"
                    className="py-1 px-2 m-1 justify-center items-center gap-2 rounded-md border text-lg bg-@2A9D8F text-white font-semibold shadow-sm align-middle hover:scale-105 focus:outline-none   transition-all text-md dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                    disabled={isDisabled}
                  >
                    Submit
                  </button>
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
