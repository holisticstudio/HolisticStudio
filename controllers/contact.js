const contactRouter = require ('express').Router();
const nodemailer = require ('nodemailer'); // para enviar emails

contactRouter.post('/', async (request, response) => {

  try {
      const { fullname, email, message} = request.body

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
        subject: "New contact from Web", // Subject line
        text: ``,
        html: `<p>Nombre: ${fullname}</p> 
              <p>e-mail: ${email}</p> 
              <p>Mensaje: ${message}</p>`, // html body, 
      });

      return response.status(201).json('E-mail enviado');;

    } catch (error) {
      console.log(error);
    }

    });
    
module.exports = contactRouter;