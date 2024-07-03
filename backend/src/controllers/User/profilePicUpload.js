import { uploadOnCloudinary } from "../../utils/cloudinary.js"
import { storeFile } from "../../utils/storeFile.js"

export const profilePicUpload = async (_, payload) => {
  const localFilePath = await storeFile(payload.file)
  const cloudinaryFile = await uploadOnCloudinary(localFilePath)
  const cloudinaryUrl = cloudinaryFile.url
  return cloudinaryUrl
}
