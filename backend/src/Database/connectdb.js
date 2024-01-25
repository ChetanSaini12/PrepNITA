import Client from 'pg'
import asyncHandler from '../utils/AsyncHandle.js'

const connectDB = asyncHandler(async () => {
  try {
    const client = new Client.Client({
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      database: process.env.PG_DATABASE,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
    })

    await client.connect()
    console.log('client has connected')

    client.on('error', (err) => {
      console.error('something bad has happened!', err.stack)
    })

    // const res = await client.query('SELECT NOW()')
    // console.log(res)

    await client.end()
    console.log('client has disconnected')
  } catch (error) {
    console.log('Error while connecting with Postgres : ', error)
  }
})

export default connectDB
