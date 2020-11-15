require('dotenv').config()
const nodeMailer = require('nodemailer');
const user = require('../database/user');

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.ACCOUNT,
    clientId: process.env.CLINENTID,
    clientSecret: process.env.CLINENTSECRET,
    refreshToken: process.env.REFRESHTOKEN,
  },
});

/**
 * register a new user
 * @param {*} req request
 * @param {*} res response
 */
function registerUser(req, res) {
  user.register(req.body)
  .then( response => {
    let options = {
      from: process.env.ACCOUNT,
      to: req.body.email,
      subject: 'Welead 帳號驗證',
      html: `<p>歡迎您成為 Welead 會員，請點擊<a href="https://welead.co/verify?verify_token=${response}">連結</a>驗證您的帳號</p>`,
    };

    transporter.sendMail(options, (error, response) => {
      error ? console.log(error) : console.log(response);
      transporter.close();
    });

    res.send({
      "status": "1",
      "data": "Register successed！"
    });
  })
  .catch( error => {
    res.send({
      "status": "2",
      "message": error
    });
  });
}

module.exports = registerUser;