const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transporterDetails = smtpTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: "hoseinshaemi1394@gmail.com",
    pass: "dlgtifowvplgcerg",
  },
});

const sendEmail = (email, fullname, subject, message) => {
  const transporter = nodemailer.createTransport(transporterDetails);
  const options = {
    from: "hoseinshaemi1394@gmail.com",
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
