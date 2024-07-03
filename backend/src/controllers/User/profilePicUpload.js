import { finished } from 'stream/promises'
import { createWriteStream } from 'fs';

export const profilePicUpload = async (_, payload) => {
  const file = await payload.file
  const { createReadStream, filename, mimetype, encoding } = await file
  const stream = createReadStream()
  const out = createWriteStream('local-file-output.jpeg')
  stream.pipe(out)
  await finished(out)

  return { filename, mimetype, encoding }
}
