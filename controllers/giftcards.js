const giftRouter = require ('express').Router();
const nodemailer = require ('nodemailer'); // para enviar emails

giftRouter.post('/', async (request, response) => {

  try {
      const { from, to, fromPhone, toPhone, service, message} = request.body

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.HOLISTIC_EMAIL,
          pass: process.env.HOLISTIC_PASS
        }
      });

    await transporter.sendMail({
        from:process.env.HOLISTIC_EMAIL,// sender address
        to: process.env.HOLISTIC_EMAIL, // list of receivers
        subject: "NEW GIFT CARD SOLD", // Subject line
        text: ``,
        html: `<p>DE: ${from}</p>
              <p>TELEFONO COMPRADOR: ${fromPhone}</p>
              <p>PARA: ${to}</p>
              <p>TELEFONO BENEFICIARIO: ${toPhone}</p>
              <p>SERVICIO: ${service}</p>
              <p>MENSAJE: ${message}</p>`,
              
              // html body, 
      });

      return response.status(201).json('E-mail enviado');;

    } catch (error) {
      console.log(error);
    }

    });
    
module.exports = giftRouter;
