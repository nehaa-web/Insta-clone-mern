import React, { useEffect } from 'react'
import { FaRegComment, FaRegHeart, FaShare } from "react-icons/fa";
import Post from "../components/Post"
import { FaRegBookmark } from "react-icons/fa";
import { usePost } from '../hooks/usePost';
import Nav from '../../shared/components/Nav';
const Feed = () => {


 const { feed , handleGetFeed , loading , handlelike , handleUnlike } =  usePost()

 useEffect(()=>{
  handleGetFeed()
 },[])
 

 if(loading || !feed){
  return (
    <main><h1>Feed is loading</h1></main>
  )
 }

 console.log(feed);
 

  return (
    <div className='bg-gradient-to-br from-[#0e7b78] to-[#052c2b] min-h-screen text-white'>
      <Nav />
        <div className='flex items-center flex-col gap-2  justify-center'>
         {feed.map((post) => {
  return <Post key={post._id}  post={post}  users={post.users} loading={loading} handlelike={handlelike} handleUnlike={handleUnlike}/>
})}
        


        </div>
      
    </div>
  )
}

export default Feed
