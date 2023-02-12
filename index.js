const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 3300;

function sendEmail(email, code) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "better2gether@outlook.co.il",
        pass: "ppforcbjivjbuudu",
      },
    });
    const mail_configs = {
      from: "better2gether@outlook.co.il",
      to: email,
      subject: "Verify code reset password",
      text: `Hey from Gether, your verifycation code is: ${code}`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: "An error has accured" });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}
app.use(express.json({ limit: "20mb" }));
app.use(cors());

app.post("/", (req, res) => {
  let email = req.body.email;
  let code = req.body.code;
  sendEmail(email, code)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log(`email on port: ${port}`);
});
