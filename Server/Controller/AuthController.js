import userModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

export const RegisterController = async (req, res) => {
  try {

    const { name,email, password } = req.fields;
    const {pic}=req.files ;  
     

   
    if (!email || !name || !password) {
      return res.status(400).send({
        message: "Required data is missing for registration!",
      });
    }
   
    const existingUser = await userModel.find({ email,name });
    if(existingUser[0]){
      return res.status(200).send({
        success:false,
        message: "This email or user-name is already used! ",
      });  

    }
    const encrypted = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password:encrypted,
    });

    if (pic) {
     user.pic.data = fs.readFileSync(pic.path);
      user.pic.contentType = pic.type;
    }

    await user.save();

    const dataUser = await userModel.findOne({ email });
    
    

    res.status(200).send({
      _id: dataUser.id,
      name: user.name,
      email: user.email,
      success: true,
      message: "user register is successfull",
      
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      
      message: "Something went wrong on the Server!",
      error,
    });
  }
};

export const LoginController = async (req, res) => {
  try {
   
    const { email, password } = req.fields;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const dataUser = await userModel.findOne({ email }).select("-pic");

    if (!dataUser) {
      return res.send({
        success: false,
        message: "User with this email does not exist",
      });
    }

    const match = await bcrypt.compare(password, dataUser.password);

    if (!match) {
      return res.send({
        success: false,
        message: "Wrong Email or Password!",
      });
    }
    const token =  jwt.sign(
      { _id: dataUser._id },
      process.env.KEY,
      {
        expiresIn: "7d",
      }
    );
    console.log(token);
    res.status(200).send({
      success: true,
      message: "Succesfully Logged In !",
      user: {
        
        name: dataUser.name,
        email: dataUser.email,
        _id: dataUser._id,
      
      
      },
      token
    });

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Something went wrong on the Server!",
      error,
    });
  }
};

export const AllUserController = async (req, res) => {
  try {
   const keyWord= req.query.search?{
    $or:[
      {name:{$regex:req.query.search,$options:"i"}},
      {email:{$regex:req.query.search,$options:"i"}},
    ],
   }:{}

       
   const users=  await userModel.find(keyWord).find({_id:{$ne:req.user._id}}).select("-pic");

   
   

if(users){
  console.log(users);
    res.status(200).send({
      users,
      message:"users sent successfully",
      success:true,
    });
  }
  else{
    res.status(400).send({
      message:"No users found",
      success:false
    })
  }

  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: "Something went wrong on the Server!",
      error,
    });
  }
};

export const SingleController = async (req, res) => {
  try {
    const id = req.params.pid;
    const user = await userModel.findById(id);
    console.log(user.userName);
    res.status(200).send({
      user,
      message: "user retrieved successfully!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something went wrong on the Server!",
      error,
    });
  }
};
