import { finished } from 'stream/promises';
import { createWriteStream } from 'fs';
import path from 'path';

export const storeFile = async (file) => {
  const { createReadStream, filename } = await file;
  const stream = createReadStream();
  
  // Get the current date and time
  const curDateTime = new Date().toISOString().replace(/[:.]/g, '-');
  
  // Extract the file extension from the original filename
  const ext = path.extname(filename);
  
  // Construct the new filename with the current date and time
  const newFilename = `file-${curDateTime}${ext}`;
  
  // Create a writable stream to save the file locally
  const newFilePath = `src/temp.filestorage/${newFilename}`;
  const out = createWriteStream(`src/temp.filestorage/${newFilename}`);
  stream.pipe(out);
  
  // Wait until the writing is finished
  await finished(out);

  return newFilePath;
};
