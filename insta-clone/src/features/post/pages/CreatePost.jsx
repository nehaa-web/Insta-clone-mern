import React, { useRef, useState } from "react";
import { usePost } from "../hooks/usePost";
import { Navigate, useNavigate } from "react-router-dom";

const CreatePost = () => {

const [caption, setCaption] = useState("")
const postImgInputFieldRef  = useRef(null)
const navigate = useNavigate()

const { loading , handleCreatePost } = usePost()

async  function handleSubmit(e){

  e.preventDefault()
  const file = postImgInputFieldRef.current.files[0]

  await handleCreatePost(file , caption)
navigate("/")
}
if(loading){
  return (
    <main><h1>Creating Post..........</h1></main>
  )
}


  return (
    <div
      className="min-h-screen  w-full flex bg-gradient-to-br from-[#0e7b78] to-[#052c2b] text-white items-center justify-center "
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="w-full max-w-sm aspect-square rounded-2xl bg-[#16333A]/90 backdrop-blur-md border border-white/15 shadow-2xl shadow-white p-6 sm:p-8 flex flex-col justify-center overflow-y-auto ">
{/* Heading */}
        <div className="flex flex-col  items-center justify-center">

          <h1 className="text-2xl sm:text-3xl font-light tracking-wide">
            Create Post
          </h1>

        </div>
{/* form */}
        <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 pt-10 sm:pt-12">

          <label className="text-black bg-white w-fit px-2 rounded-sm" htmlFor="postImg">Select image</label>
          <input ref={postImgInputFieldRef} hidden type="file" name="postImg" id="postImg" />

          <input
            className="flex-1 min-w-0 bg-transparent outline-none border p-2 text-white rounded-sm   placeholder-white/50 text-sm"
            type="text"
            name="caption"
            value={caption}
            onChange={(e)=>{setCaption(e.target.value)}}
            id="caption"
            placeholder="Enter Caption"
          />

          {/* button */}
          <button
            type="submit"
            className=" w-full py-3 rounded-md bg-[#0B1E24] hover:bg-[#0F262D] text-white text-sm tracking-[0.2em] uppercase transition-colors"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
