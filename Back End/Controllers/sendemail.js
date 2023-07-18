const user = require('../Models/user');
const ErrorHandling = require('../utilles/err');
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' })

const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: process.env.PORT,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemailforwardemail.net>
        user: 'REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM',
        pass: 'REPLACE-WITH-YOUR-GENERATED-PASSWORD'
    }
});

sendEmail = (req, res, next) => {
    user.findOne({ email: req.body.email }).then(userEmail => {
        if (userEmail) {
            main(req.body.email).catch(err => next(err));
            res.status(201).json({ data: 'Check your Email' })
        }
        else {
            res.status(404).json({ data: 'This Email not used' })
        }
    }).catch(err => next(err))

}

async function main(req) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: "EgyptStore@gmail.com", // sender address
        to: req, // list of receivers
        subject: "Reset Password ✔", // Subject line
        text: "Hello to Egypt Store", // plain text body
        html: "<a>Hello world?</a>", // html body
    });
    console.log("Message sent: %s", info.messageId)
}
main().catch(console.error);