import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { handleError, handleSuccess } from "../src/utils";
import { ToastContainer } from "react-toastify";

function Create() {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  // const [file, setFile] = useState("");
  const [content, setContent] = useState("");
  const [blogger, setBlogger] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!title || !summary || !content || !blogger) {
      return handleError("All fields are Require");
    }
    const addblog = { title, summary, content, blogger };
    try {
      if(content.length<=25){
        handleError("Your Content Should be of More Characters")
      }
      else{

        const response = await fetch("http://localhost:3000/create", {
          method: "POST",
          body: JSON.stringify(addblog),
          headers: {
            "Content-Type": "application/json",
            
          },
          credentials: "include",
        });
        const result = await response.json();
        if (!response.ok) {
         
          throw new Error(response.status)
        }
        
        if (response.ok) {
          setTitle("");
          // setFile("")
          setSummary("");
          setContent("");
          setBlogger("")
          handleSuccess("Your Blog has been Created Successfully!");
          console.log(result);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.message === "401") {
        handleError("Unauthorized! Please login again to Create.");
        navigate
    } else if (error.message === "403") {
        handleError("Access Denied! You are not allowed to perform this action.");
    } else {
        handleError("Something went wrong! Please try again.");
    }
    
    }
  };

  return (
    <div className="flex flex-col min-h-screen mt-6 justify-center items-center">
      <div className="w-2xl">
        <form onSubmit={handleCreate}>
          <header className="font-bold  text-gray-800  text-2xl">
            <textarea
              className="p-2 pl-3 rounded-2xl border-none outline-none focus:ring-blue-500 focus:ring-1 shadow-xl border-1"
              autoFocus
              placeholder="Your Title"
              rows="2"
              cols="45"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </header>
          <div className="flex flex-col mt-6">
            <summary className="font-semibold  text-gray-600 text-xl">
              <textarea
                className="p-2 pl-3 rounded-2xl border-none outline-none focus:ring-blue-500 focus:ring-1  shadow-xl border-1"
                placeholder="Your Summary"
                rows="6"
                cols="59"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </summary>
          </div>

          <div className="flex mt-10 rounded-2xl flex-col gap-10">
            <JoditEditor
              className="rounded-2xl"
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
          <div className="font-semibold mt-4 flex justify-center  text-gray-600 text-xl">
            <input
              placeholder="Enter Your Name"
              className=" border-none pl-3 pr-2 outline-none focus:ring-blue-500 focus:ring-1 shadow-md p-2 rounded-2xl"
              type="text"
              value={blogger}
              maxLength='30'
              onChange={(e) => setBlogger(e.target.value)}
            />
          </div>

          <div className="flex flex-col justify-center items-center">
            <button className="border-none m-8 p-2 w-24 cursor-pointer text-white  bg-blue-500 hover:bg-blue-400 active:bg-blue-600 rounded-xl">
              Submit
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Create;
