import Client from 'pg'

const connectDB = async () => {
  try {
    const client = new Client.Client({
      host: 'localhost',
      port: 5432,
      database: 'MindSet',
      user: 'postgres',
      password: 'chetanPOSTGRES1241@',
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
    console.log("Error while connecting with Postgres : ", error);
  }
}

export default connectDB
