const { default: mongoose } = require("mongoose");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.createUser = async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;
  try {
    const user = await UserModel.create({
      firstName,
      lastName,
      userName,
      email,
      password,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(200).send({ err });
  }
};

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.getUserByID = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`ID unknow : ${req.params.id}`);
  }
  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(`ID unknow : ${err}`);
    }
  }).select("-password");
};

/**
 * - only update user with valid ID
 * - doesn't create missing parameters (doesn't give any error)
 *
 *
 * @param {*} req
 * @param {*} res
 * @return updated document in JSON
 */
module.exports.updateUserByID = async (req, res) => {
  UserModel.exists({ _id: req.params.id }, async (err, doc) => {
    if (err) {
      return res.status(500).send(`ID unknow ${req.params.id}`);
    } else {
      try {
        UserModel.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              userName: req.body.userName,
              password: req.password,
              email: req.body.email,
            },
          },
          { runValidators: true, returnDocument: "after" },
          (err, docs) => {
            if (!err) return res.send(docs);
            else return res.status(500).send({ message: err });
          }
        );
      } catch (err) {
        return res.status(500).json({ message: err });
      }
    }
  });
};


module.exports.deleteUserByID = async (req, res) => {
  UserModel.exists({ _id: req.params.id }, async (err, doc) => {
    if (err) {
      return res.status(500).send(`ID unknow ${req.params.id}`);
    } else {
      try {
        await UserModel.deleteOne({ _id: req.params.id }).exec();
        return res.status(200).json({ message: "Successfully deleted." });
      } catch (err) {
        return res.status(500).json({ message: err });
      }
    }
  });
};
