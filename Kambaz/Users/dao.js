import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function UsersDao() {
  const createUser = async (user) => {
    delete user._id;
    const newUser = { ...user, _id: uuidv4() };  // Generate new UUID
    return await model.create(newUser);
  };
  
  const findAllUsers = async () => await model.find();
  
  const findUserById = async (userId) => await model.findById(userId);
  
  const findUserByUsername = async (username) => await model.findOne({ username });
  
  const findUserByCredentials = async (username, password) => 
    await model.findOne({ username, password });
  
  const findUsersByRole = async (role) => await model.find({ role: role });
  
  const findUsersByPartialName = async (partialName) => {
    const regex = new RegExp(partialName, "i");
    return await model.find({
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
  };
  
  const updateUser = async (userId, user) => 
    await model.updateOne({ _id: userId }, { $set: user });
  
  const deleteUser = async (userId) => await model.deleteOne({ _id: userId });
  
  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    findUsersByRole,
    findUsersByPartialName,
    updateUser,
    deleteUser
  };
}