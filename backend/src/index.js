import moment from 'moment'
import connectDB from './Database/connectdb.js'
import { app } from './app.js'
import cron from 'node-cron'

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})



console.log("moment",JSON.stringify(moment()));
