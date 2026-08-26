import React from 'react'
import { useNavigate } from 'react-router-dom'
const Nav = () => {

const navigate = useNavigate()

  return (
    <nav className='min-w-full px-5 py-2 '>
      <div className='flex items-center justify-between '>
        <h1 style={{ fontFamily: "Instagram Sans" }} className='text-4xl bg-gradient-to-r from-[#3f0664] via-[#FD1D1D] to-[#FCAF45] bg-clip-text text-transparent'>Instagaram</h1>
     <button
     onClick={()=>{navigate("/create-post")}}
              type="submit"
              className=" px-3  py-3 rounded-md bg-[#091c1b] hover:bg-[#0F262D] text-white text-sm tracking-[0.2em] uppercase transition-colors"
            >
              Create Post
            </button>
      </div>
    </nav>
  )
}

export default Nav
