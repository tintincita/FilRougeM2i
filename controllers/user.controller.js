const UserModel = require("../models/user.model");

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
}
