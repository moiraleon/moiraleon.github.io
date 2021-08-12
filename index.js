const express= require('express');
const path = require('path');
const app =express();
app.use(express.json());
app.use(express.static('public'))

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

  app.post("/contact-form", (req,res)=>{
    let{fname,lname,mail,phone,subject} =req.body;
    console.log(req.body)
    res.status(200).send(req.body)
})

  
const port = process.env.PORT||5200

app.listen(port,()=>{console.log(`listening on port ${port}`)})