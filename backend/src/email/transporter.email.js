import nodemailer from 'nodemailer'
import path from 'path'
import hbs from 'nodemailer-express-handlebars'
import 'dotenv/config'
function createGmailTransporter(email, password) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    service: 'gmail',
    auth: {
      user: email,
      pass: password,
    },
  })

  return transporter
}

function createOutlookTransporter(email, password) {
  let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    secureConnection: false,
    port: 587,
    service: 'gmail',
    auth: {
      user: email, // generated ethereal user
      pass: password, // generated ethereal password
    },
    tls: {
      ciphers: 'SSLv3',
    },
  })

  return transporter
}

async function createTransporter() {
  const email = process.env.EMAIL
  const password = process.env.EMAIL_PASSWORD

  console.log(`EMAIL : ${email} and PASSWORD : ${password}`)
  var transporter
  const domain = email.split('@')[1]

  if (domain.includes('gmail.com')) {
    transporter = createGmailTransporter(email, password)
  } else transporter = createOutlookTransporter(email, password)

  const options = {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: path.resolve('./src/templates/emailTemplates'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./src/templates/emailTemplates'),
    extName: '.handlebars',
  }

  transporter.use('compile', hbs(options))

  return { transporter: transporter, email: email }
}

export default createTransporter
