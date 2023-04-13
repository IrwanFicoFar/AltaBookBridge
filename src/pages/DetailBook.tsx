import { FC } from "react";
import { Layout } from "../components/Layout";
import { Link } from "react-router-dom";
import { Input, TextArea } from "../components/Input";

const UploadBook: FC = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center bg-slate-100">
        <div className="grid  md:max-w-60 lg:max-w-[50%] col-span-2 m-5 md:m-10 justify-start items-center  dark:bg-slate-800  rounded-2xl">
          <form className="flex flex-col p-5 justify-center items-center shadow-lg bg-white gap-3 rounded-large">
            <h1 className="uppercase font-bold text-3xl text-back dark:text-white">
              Detail Book
            </h1>
            <div className="grid md:grid-cols-2">
              <div className="flex p-2 justify-center items-center">
                <img
                  src="./download.jpeg"
                  alt=""
                  className="w-auto h-80 rounded-[5%]"
                />
              </div>
              <div className="flex flex-col">
                <div className="w-full">
                  <label className="font-bold">Title</label>
                  <p className="uppercase font-bold text-xl"> Dragon Ball</p>
                </div>
                <div className="w-full">
                  <label className="font-bold">Description</label>
                  <p className="w-full h-[10%]">
                    The Default Book is a gripping tale of one person's journey
                    through life. It follows the main character as they navigate
                    various challenges and triumphs, all while struggling to
                    find their place in the world. From the ups and downs of
                    relationships to the highs and lows of career success, this
                    book explores the many facets of human existence.
                  </p>
                </div>
                <div className="flex w-full">
                  <button
                    type="button"
                    className="py-2 px-4 m-2 w-full inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-@2A9D8F text-white hover:bg-@1F7168 focus:outline-none   transition-all text-sm dark:focus:ring-offset-gray-800"
                    data-hs-overlay="#hs-medium-modal"
                  >
                    Edit Book
                  </button>
                  <button
                    type="button"
                    className="py-2 px-4 m-2 w-full inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-@E76F51 text-white hover:bg-@F4A261 focus:outline-none   transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Delete
                  </button>
                  <div
                    id="hs-medium-modal"
                    className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
                  >
                    <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all md:max-w-2xl md:w-full m-3 md:mx-auto">
                      <form className="flex flex-col p-5 items-center shadow-lg bg-white gap-3 rounded-large">
                        <h1 className="uppercase font-bold text-3xl text-back dark:text-white">
                          Update Books
                        </h1>
                        <div className="grid md:grid-cols-2 justify-center">
                          <div className="">
                            <div className="p-2">
                              <img
                                src="./download.jpeg"
                                alt=""
                                className="w-auto h-80 rounded-[5%]"
                              />
                            </div>
                            <div className="p-2 w-40">
                              <label className="block">
                                <span className="sr-only">
                                  Choose profile photo
                                </span>
                                <input
                                  type="file"
                                  className=" w-fit block text-sm text-gray-500
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
                          <div className="flex flex-col justify-center items-center">
                            <div className="w-full">
                              <label className="font-bold">Title</label>
                              <Input
                                placeholder="Insert title book"
                                id="title_book"
                                type="text"
                              />
                            </div>
                            <div className="w-full py-3 ">
                              <label className="font-bold">Description</label>
                              <TextArea
                                placeholder="Book's descriptions...."
                                id="desc_book"
                              />
                            </div>
                            <div className="w-fit">
                              <button className="py-1 px-2 m-1 justify-center items-center gap-2 rounded-md border text-lg bg-@2A9D8F text-white font-semibold shadow-sm align-middle hover:scale-105 focus:outline-none   transition-all text-md dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                Update
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
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
