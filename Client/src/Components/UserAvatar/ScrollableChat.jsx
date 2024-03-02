import React, { useEffect,useState } from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { useAuth } from '../Authentication/Context/auth'

const ScrollableChat = ({messages,socket}) => {
const[auth,setAuth]= useAuth();





const isSameSenderMargin = (messages, m, i, userId) => {
    // console.log(i === messages.length - 1);
  
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
      return 33;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 0;
    else return "auto";
  };




  return (
    <ScrollableFeed>
        { messages.map((m,i)=>(
             <div style={{display:'flex',padding:'5px'}} key={m._id}>
              <span style={{backgroundColor:`${m.sender._id===auth.user._id? '#BEE3F8':'#B9F5D0'}`,
               borderRadius:'20px',
               padding:'5px 15px',
               maxWidth:'200px',
               marginLeft: isSameSenderMargin(messages, m, i, auth.user._id),
              }}>
             {m.content} 
              </span>
        
             </div>
            

        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat