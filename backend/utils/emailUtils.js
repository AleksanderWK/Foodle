const nodemailer = require("nodemailer");

const sendEmail = (toUser, subject, htmlContent) => {
  try {
    const serviceEmailAddress = process.env.EMAIL_ADDRESS;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: serviceEmailAddress,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: serviceEmailAddress,
      to: toUser.email,
      subject: subject,
      html: htmlContent,
    };
    transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error();
  }
};

exports.sendEmail = sendEmail;
