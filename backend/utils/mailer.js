const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendActivationEmail = (email, token) => {
    const url = `${process.env.CLIENT_URL}/activate/${token}`;

    const mailOptions = {
        from: `"Soporte" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Activa tu cuenta',
        html: `<p>Haz clic en el siguiente enlace para activar tu cuenta:</p>
           <a href="${url}">${url}</a>`
    };

    return transporter.sendMail(mailOptions);
};

const sendEmail = (to, subject, html) => {
    const mailOptions = {
        from: `"Soporte" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
    };
    return transporter.sendMail(mailOptions);
};

module.exports = { sendActivationEmail, sendEmail };
