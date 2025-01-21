const giftRouter = require ('express').Router();
const nodemailer = require ('nodemailer'); // para enviar emails

giftRouter.post('/', async (request, response) => {

  try {
      const { from, to, fromEmail, fromPhone, toPhone, service, message} = request.body

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
        to: `${fromEmail}`,// list of receivers
        subject: "HOLISTIC STUDIO - GIFT CARD", // Subject line
        text: ``,
        html: `Hello ✨ Has pre-ordenado una Gift Card en Holistic Studio. <br /> <br />
              Confirma los datos de tu Gift Card 💌
              <p>De: ${from}</p>
              <p>Teléfono comprador: ${fromPhone}</p>
              <p>Para: ${to}</p>
              <p>Teléfono beneficiario: ${toPhone}</p>
              <p>Servicio: ${service}</p>
              <p>Mensaje: ${message}</p> <br /> 
               Para confirmar tu orden, por favor escríbenos a este link: wa.me/584123313135
               para efectuar tu pago. <br /> 
              Si deseas una Gift Card física tiene un costo de $3 y requiere ser retirada en
              nuestro studio de Los Palos Grandes. De ser en digital, no tiene coste adicional
              y se envía mediante WhatsApp. <br /> <br />3
              Te esperamos!
              `,
              // html body, 
      })
      
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
