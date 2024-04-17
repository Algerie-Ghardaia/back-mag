const nodemailer = require("nodemailer");


const sendVerificationEmail = async(email,token) => {
    const trasporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user:"djani.mohammed.amine@gmail.com",
            pass:'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'
        },
    })
    const mailOptions = {
        form:"Alimentaion.com",
        to : email,
        subject:'Email Verivication',
        text: `veuillez cliquer sur le lien suivant pour vérifier l'e-mail:http://localhost:3000/verify/${token}`
    }


    try {
        await trasporter.sendMail(mailOptions)
    } catch (error) {
        console.log("error sending verification email",error);
    }
};
module.exports = sendVerificationEmail;