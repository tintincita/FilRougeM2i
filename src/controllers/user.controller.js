const { default: mongoose } = require("mongoose");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

/**
 * Create user with POST method from '/api/user/create'.
 * - Require a request.body.firstName, request.body.lastName, request.body.userName
 * , request.body.email, request.body.password
 *
 * @param {*} req
 * @param {*} res
 *
 * @return User ID
 */
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

/**
 * Get all users from GET method from '/api/user'.
 * - Password excluded
 *
 * @param {*} req
 * @param {*} res
 *
 * @return All users as JSON
 */
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

/**
 * Get user by ID with GET method from '/api/user/:id'.
 * - Password excluded
 *
 * @param {*} req
 * @param {*} res
 *
 * @return User from ID
 */
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
 * Update user by ID with PUT method from /api/user/:id
 * - Only update user with a valid ID
 * - Doesn't create missing parameters (doesn't give any error either)
 *
 * @param {*} req
 * @param {*} res
 * @return Updated document in JSON
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

/**
 * Delete user by ID with DELETE method from '/api/user/:id'.
 *
 * @param {*} req
 * @param {*} res
 *
 * @return "Successfully deleted : <target>"
 */
module.exports.deleteUserByID = async (req, res) => {
  const target = req.params.id;
  UserModel.exists({ _id: target }, async (err, doc) => {
    if (err) {
      return res.status(500).send(`ID unknow ${target}`);
    } else {
      try {
        await UserModel.deleteOne({ _id: target }).exec();
        return res
          .status(200)
          .json({ message: `Successfully deleted : ${target}` });
      } catch (err) {
        return res.status(500).json({ message: err });
      }
    }
  });
};
