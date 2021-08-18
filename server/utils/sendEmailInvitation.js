const nodemailer = require('nodemailer');

const sendEmailInvitation = (address, sender, teamName) => {
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PASSWORD,
    }
  });

  const mailOptions = {
    from: process.env.MAIL_ADDRESS,
    to: address,
    subject: `Invitation: Join Team ${teamName}`,
    text: '',
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ', info.response);
    }
  });
}

module.exports = sendEmailInvitation;