import User from "../models/User.js";

/**
 * Find user by email
 */
export const findUserByEmail = async (email) => {
  return await User.findOne({
    email: email.toLowerCase(),
  });
};

/**
 * Find user by phone
 */
export const findUserByPhone = async (phone) => {
  return await User.findOne({
    phone,
  });
};

/**
 * Create new user
 */
export const createUser = async (userData) => {
  const user = new User(userData);

  return await user.save();
};