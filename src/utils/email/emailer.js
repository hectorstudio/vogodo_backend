const nodemailer = require('nodemailer');
const path = require('path');

const {
  displayHead,
  contentBodyBuilderForUserRegister
} = require('./emailtemplate');

// import .env variables
require('dotenv-safe').load({
  path: path.join(__dirname, `../../../.env-${process.env.NODE_ENV || 'test'}`),
  sample: path.join(__dirname, '../../../.env.example'),
});

const _sendMail = (mailOptions) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
     });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(error);
      } else if (info) {
        console.log(info);
        resolve(true);
      }
    });
  });
};

const buildContentHTMLForUserRegister = (data) => {
  const NETMODE = process.env.NODE_ENV === 'production' ? 'live' : 'test';

  const bodyStr = contentBodyBuilderForUserRegister(data, NETMODE);

  const contentHTML = `
    <html lang="en" style="margin:0;padding:0">
      ${displayHead()}
      ${bodyStr}
    </html>
  `;

  // console.log(contentHTML)
  return contentHTML;
};

const sendMailForUserRegister = async (to, data) => {
  try {
    const contentHTML = buildContentHTMLForUserRegister(data);

    // Only for test
    // console.log(contentHTML)
    // return

    const companyName = 'BetterComp';
    const mailOptions = {
      from: `"${companyName}" <${process.env.MAIL_USER}>`,
      to,
      subject: 'User Registration Confirmation',
      html: contentHTML
    };

    await _sendMail(mailOptions);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  sendMailForUserRegister
};
