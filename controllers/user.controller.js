const UserModel = require("../models/user.model");
const ObjectID=require('mongoose').Types.ObjectId;

module.exports.create = async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;
  try {
    const user = await UserModel.create({
      firstName,
      lastName,
      userName,
      email,
      password
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(200).send({ err });
  }
};

module.exports.getAllUsers = async (req,res)=> {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo= (req,res)=> {
  if(!ObjectID.isValid(req.params.id)){
    return res.status(400).send(`ID unknow : ${req.params.id}`);
  }
  UserModel .findById(req.params.id, (err,docs)=>{
    if(!err) {
      res.send(docs)
    }
    else {
      console.log(`ID unknow : ${err}`);
    }
  }).select("-password");
}
