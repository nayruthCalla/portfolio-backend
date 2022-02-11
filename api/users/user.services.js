const User = require('./user.model');

const createUser = async (answer) => {
  try {
    const newUser = new User(answer);
    const savedUser = await newUser.save();
    console.log(savedUser);
    return savedUser;
  } catch (err) {
    console.log('elorr', err);
    return err;
  }
};

const getUserById = async (id) => {
  try {
    const userById = await User.findById(id);
    return userById;
  } catch (err) {
    return null;
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    return err;
  }
};

const updateUser = async (id, data) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, data);
    return updatedUser;
  } catch (err) {
    return null;
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  } catch (err) {
    return null;
  }
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
