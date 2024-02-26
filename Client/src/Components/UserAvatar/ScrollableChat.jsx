import React, { useEffect,useState } from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { useAuth } from '../Authentication/Context/auth'

const ScrollableChat = ({messages,socket}) => {
const [animate,setAnimate]=useState(false);
const[auth,setAuth]= useAuth();



const isSameSender= (messages,m,i,userId)=>{
    return (
        i<messages.length-1 && (messages[i+1].sender_id!==m.sender_id
            ||messages[i+1].sender_id===undefined)&&
            messages[i].sender_id!==userId

    );
}


const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };
  


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


const isLastMessage = (messages,i,userId)=>{
    return (
        i===messages.length-1 &&
        messages[messages.length-1].sender._id!==userId&&
        messages[messages.length-1].sender_id
    );
}

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