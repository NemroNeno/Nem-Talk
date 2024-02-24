import chatModel from "../Models/chatModel.js";
import messageModel from "../Models/messageModel.js";
import userModel from "../Models/userModel.js";

export const creatMessage= async (req,res)=>{

    try {
        
      const {chatId,senderId,text}= req.body;
      const message= new messageModel({
        chatId,senderId,text
      })
      const response= await message.save();
      res.status(200).json(response);

    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};


export const getAllMessage= async (req,res)=>{

    try {

        const Id= req.params.chatId
      
        const messages= await messageModel.find({chat:Id}).populate('sender','name email').populate('chat');
        res.status(200).json(messages)

    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}





export const sendMessage= async(req,res)=>{

    try {
        
        const {content,chatId }=req.body;
        if(!content ||!chatId ){
            console.log('Invalid data passed into request');
            return res.sendStatus(400);
        }

        var newMessage={
            sender: req.user._id,
            content:content,
            chat:chatId,

        }
 
        var message=await messageModel.create(newMessage);
         message=await message.populate('sender','name');
         message= await message.populate('chat');
         message= await userModel.populate(message,{
            path:'chat.users',
            select:'name email',
         })

        
await chatModel.findByIdAndUpdate(chatId,{
    latestMessage:message
});



res.json(message);

    } catch (error) {
        console.log(error)
        res.status(500).json(error);   
    }

}