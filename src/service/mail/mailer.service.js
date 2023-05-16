const nodemailer = require('nodemailer');
const uuid = require('uuid');

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'omelchenko.marina04@mail.ru',
        pass: 'xw8xku9u84gxCnTy0m9R',
    },
});

function sendTestMail(userEmail, activationCode) {
    const activationLink = `http://localhost:3000/activate?code=${activationCode}`;
    const mailOptions = {
        from: 'Test App <omelchenko.marina04@mail.ru>',
        to: userEmail,
        subject: 'Активация аккаунта',
        html: `
      <p>Чтобы активировать свой аккаунт, перейдите по ссылке:</p>
      <a href="${activationLink}">${activationLink}</a>
    `,
    };

    return transporter.sendMail(mailOptions);
}

const MailService = {
    sendTestMail: sendTestMail
}
module.exports = MailService;
