export const profileDTO = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  phone: user.phone,
  bio: user.bio,
  gender: user.gender,
  dateOfBirth: user.dateOfBirth,
  profileImage: {
    url: user.profileImage?.url || "",
    publicId: user.profileImage?.publicId || "",
  },
  role: user.role,
  ownerStatus: user.ownerStatus,
  isVerified: user.isVerified,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});