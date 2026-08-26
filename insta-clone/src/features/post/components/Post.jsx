import React from 'react'
import { FaRegComment, FaRegHeart, FaShare } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";


const Post = ({ users , post ,loading , handlelike , handleUnlike}) => {
 console.log("isLiked:", post.isLiked);
  return (
    <div>
      <div className='p-6 flex flex-col gap-5 bg-[#0b1918] w-90'>
      
          <div className='flex items-center gap-3'>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-conic from-red-700 via-orange-300 to-pink-700">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={users.profileImg}
        />
      </div>
              <p>{users.username}</p>
          </div>

  
  <img
    className="w-full  h-98 object-cover"
    src={post.postImg}
    alt=""
  />

      
        <div className='flex flex-col gap-3'>
      
         <div className="flex justify-between">
        <div className="flex gap-5">
          <FaRegHeart className={post.isLiked ? "text-red-800" : ""} 
         onClick={()=>{post.isLiked?handleUnlike(post._id ): handlelike(post._id)}} />
          <FaRegComment />
          <FaShare />
        </div>
        <FaRegBookmark />
      </div>
      
      <p>{post.caption}</p>
        </div>
      
      </div>
    </div>
  )
}

export default Post
