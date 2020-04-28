const nodemailer = require('nodemailer');
const pug =  require('pug')
const HtmlToText = require('html-to-text')
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split('')[0];
    this.url = url;
    this.from = ` zac <${process.env.EMAIL_FROM}>`;
  }
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return;
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }
  async send  (template,subject){
    //render html based on pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`,{
      firstName:this.firstName,
      url:this.url,
      subject
    })
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: HtmlToText.fromString(html),
      html
    };
    // this.newTransport()
    await this.newTransport().sendMail(mailOptions);
  }
  async sendWelcome(){
    await this.send('welcome','Welcome to the Natours website')
  }
  async sendPasswordReset(){
    await this.send('passwordReset','your password reset token valid for 20 minutes')
  }
};
const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: ' zac <hello@zac.io>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

// module.exports = Email;
