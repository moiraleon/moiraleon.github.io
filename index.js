const express= require('express');
const path = require('path');
const app =express();
app.use(express.json());
app.use(express.static('public'))
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();
// var smtpTransport = require('nodemailer-smtp-transport');

app.use('/public', express.static(path.join(__dirname, './public')))


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/index.html'))
})

app.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname,'/index.html'))
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/alternative_html _files/about.html'))
  })

app.get('/skills', (req, res) => {
    res.sendFile(path.join(__dirname, '/alternative_html _files/skills.html'))
  })

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, '/alternative_html _files/projects.html'))
  })

  app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '/alternative_html _files/contact.html'))
  })

app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, '/styles.css'))
  })

//   app.post("/contact-form", (req,res)=>{
//     let{fname,lname,mail,phone,subject} =req.body;
//     console.log(req.body)
//     res.status(200).send(req.body)

// })
//SETTING UP NODEMAILER

// async function main() {

//   let testAccount = await nodemailer.createTestAccount();

  
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);  

// var transporter = nodemailer.createTransport({
//   service:'gmail',
//   auth:{
//     user: 'moirasfeng@gmail.com',
//     pass: '...'
//   }
// });
//  var mailOptions ={
//    from: 'moirasfeng@gmail.com',
//    to: 'moirasfeng@gmail.com',
//    subject: 'Sending Email using Node.js',
//    text: 'test email'
//  };
//  transporter.sendMail(mailOptions, function(error,info){
//    if (error){
//      console.log(error);
//    }else{
//      console.log('Email sent: '+ info.response);
//    };
//  })
//updating nodemailer

// app.post("/contact-form",function(req,res){

// var transporter = nodemailer.createTransport({
//   service:'gmail',
//   secure:true,
//   auth:{
//     user: 'moirasfeng@gmail.com',
//     pass: '....'
//   }
  
// });
//  var textBody = `From: ${req.body.firstname} ${req.body.lastname} Message: ${req.body.subject}`
//  var email = `${req.body.email}`
//  var htmlBody = `<h2>Mail From Contact Form</h2> <p>from: ${req.body.firstname} ${req.body.lastname} </p> <p>${req.body.email}</p>  <p>${req.body.tel}</p> <p>${req.body.subject}</p>`
//  var mailOptions ={
//    from: email,
//    to: 'moirasfeng@gmail.com',
//    subject: 'Sending Email using Node.js',
//    text: textBody,
//    html: htmlBody
//  };
//  transporter.sendMail(mailOptions, function(error,info){
//    if (error){
//      console.log(error);
//    }else{
//      console.log('Email sent: '+ info.response);
//    };
//  });

// })

app.route("/contact-form").get(function (req, res) {
  res.sendFile(process.cwd() + "/alternative_html _files/contact.html");
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", 
  port: 587,
  auth: {
    // user: process.env.EMAIL,
    // pass: process.env.PASS,
    user: 'moirasfeng@gmail.com',
    pass: 'SoftEngPass!'
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.post("/contact-form", (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    const mail = {
      from: data.firstname,
      to: 'moirasfeng@gmail.com',
      // to: process.env.EMAIL,
      subject: 'Message from Software Engineering Site',
      text: `${data.firstname} ${data.lastname} <${data.email}> \n${data.subject}`,
    };
    
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
  });
});




const port = process.env.PORT||5200

app.listen(port,()=>{console.log(`listening on port ${port}`)})