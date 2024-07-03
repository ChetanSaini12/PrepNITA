import { storeFile } from "../../utils/storeFile.js"

export const profilePicUpload = async (_, payload) => {
  const localFilePath = await storeFile(payload.file)
  console.log('FILEPATH : ' , localFilePath)
  console.log('TYPE OF localfilepath' , typeof(localFilePath))
  return localFilePath
}
