import connectDB from './Database/connectdb.js'
import { app } from './app.js'

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log('POSTGRES DB Connection failed', error)
  })
