import createTransporter from './transporter.email.js'

async function sendEmail(receiver, message) {
  try {
    if (!receiver || !message) {
      throw new Error('Receiver and message are required')
      return
    }

    const { transporter, email } = await createTransporter()

    const mailData = {
      from: `PrepNITA Team <${email}>`,
      to: receiver,
      subject: message.subject,
      template: message.template,
      context: message.context,
    }

    await transporter.sendMail(mailData)
  } catch (error) {
    throw new Error(`Error recieved while sending mail : ${error}`)
  }
}

const tempRecevr = 'chetansaini1241@gmail.com'
const tempMessage = {
  subjest: 'test',
  template: 'test',
  context: 'test',
}

sendEmail(tempRecevr, tempMessage)

export default sendEmail
