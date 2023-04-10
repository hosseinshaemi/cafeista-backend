const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporterDetails = smtpTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = (email, fullname, subject, message) => {
  const transporter = nodemailer.createTransport(transporterDetails);
  const options = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: subject,
    html: `<h1>سلام ${fullname}</h1>\n<p>${message} کد تایید شما</p>`,
  };
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
