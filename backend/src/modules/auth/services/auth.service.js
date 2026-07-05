import bcrypt from "bcrypt";
import {
  findUserByEmail,
  findUserByPhone,
  createUser,
} from "../repositories/auth.respository.js";

export const registerUser = async (userData) => {
  const { name, email, phone, password, role } = userData;

  // Check Duplicate Email
  const existingEmail = await findUserByEmail(email);

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  // Check Duplicate Phone
  const existingPhone = await findUserByPhone(phone);

  if (existingPhone) {
    throw new Error("Phone number already exists");
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create User
  const user = await createUser({
    name,
    email,
    phone,
    password: hashedPassword,
    role,
  });

  // Return Response (Never return password)
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
  };
};