import chatModel from "../Models/chatModel.js";
import userModel from "../Models/userModel.js";

export const accessChat = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      console.log("UserId param is not sent\n");
      return res.status(400).send({
        message: "UserID is not passed",
        success: false,
      });
    }

    var isChat = await chatModel
      .find({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: req.user._id } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
      })
      .populate("users", "-password -pic")
      .populate("latestMessage");

    isChat = await userModel.populate(isChat, {
      path: "latestMessage.sender",
      select: "name email ",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };
      const createdChat = await chatModel.create(chatData);
      const FullChat = await chatModel
        .findOne({ _id: createdChat })
        .populate("users", "-password");
        res.send(FullChat);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const fetchChats = async (req, res) => {
  try {
    var chat = await chatModel
      .find({
        users: { $elemMatch: { $eq: req.user._id } },
      })
      .populate("users", "-password -pic")
      .populate("groupAdmin", "-password -pic")
      .populate("latestMessage")
      .sort({ updateAt: -1 });

    chat = await chatModel.populate(chat, {
      path: "latestMessage.sender",
      select: "name email",
    });
    res.status(200).send(chat);

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const firstId = req.params.firstId;
    const secondId = req.params.secondId;

    const chats = await chatModel.find({
      members: { $all: [firstId, secondId] },
    });

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const groupChat = async (req, res) => {
  try {
    console.log(req.body.users);
    if (!req.body.users || !req.body.name) {
      return res
        .status(400)
        .send({ message: "Please fill all the required fields" });
    }
    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
      return res
        .status(400)
        .send("More then 2 users are required to form the group chat");
    }

    users.push(req.user);

    const groupChat = await chatModel.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await chatModel
      .findOne({ _id: groupChat._id })
      .populate("users", "-password -pic");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const renameController = async (req, res) => {
  try {
    const { chatId, chatName } = req.body;
    const updatedChat = await chatModel
      .findByIdAndUpdate(
        chatId,
        {
          chatName: chatName,
        },
        {
          new: true,
        }
      )
      .populate("users", "-password -pic")
      .populate("groupAdmin", "-password -pic");

    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat not found");
    } else {
      res.json(updatedChat);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const groupAddController = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    const added = await chatModel.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    ).populate("users","-password")
       .populate("groupAdmin","-password");

       if (!added) {
        res.status(404);
        throw new Error("Chat not found");
      } else {
        res.json(added);
      }

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};







export const groupRemoveController = async (req, res) => {
    try {
      console.log('called');
      const { chatId, userId } = req.body;
      const removed = await chatModel.findByIdAndUpdate(
        chatId,
        {
          $pull: { users: userId },
        },
        { new: true }
      ).populate("users","-password")
         .populate("groupAdmin","-password");
  
         if (!removed) {
          res.status(404);
          throw new Error("Chat not found");
        } else {
          res.json(removed);
        }
  
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };