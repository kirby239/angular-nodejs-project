const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    /*  host: "smtp.gmail.com",
     port: 465,
     secure: true, // true for port 465, false for other ports */
    service: 'gmail',
    auth: {
        user: "TuCorreo@gmail.com",
        pass: "ContraseniaAplicacion"
    },
});
transporter.verify().then(() => {
    console.log('Ready or send emails')
}).catch((error) => {
    console.error('Error verifying transporter:', error);
})
// Función para enviar el correo
const sendResetPasswordEmail = async (email, verificationLink) => {
    try {
        // Configura el correo electrónico
        const mailOptions = {
            from: '"Forgot password <kirby76050389d@gmail.com>', // Remitente
            to: email, // Destinatario
            subject: 'Password Reset Request', // Asunto del correo
            html: `
                <p>You requested to reset your password. Please click the link below to reset your password:</p>
                <a href="${verificationLink}">Reset Password</a>
                <p>If you didn't request this, please ignore this email.</p>
            `
        };

        // Envía el correo
        await transporter.sendMail(mailOptions);
        console.log('Reset password email sent to:', email);

    } catch (error) {
        console.error('Error sending reset password email:', error);
        throw new Error('Failed to send reset password email');
    }
};

module.exports = { sendResetPasswordEmail };