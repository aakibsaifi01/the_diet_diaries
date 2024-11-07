const express = require("express")
const path=require("path")
const hbs=require("hbs")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
const { error } = require("console")
const encoder = bodyParser.urlencoded()
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user:"aakibsaifi938@gmail.com",
        pass:"fxzxckkywhigsycq"
    }
})
const app = express()
app.use(express.static(path.join(__dirname,"views/public")))
app.set("view engine","hbs")
hbs.registerPartials(path.join(__dirname,"views/partial"))
app.get("/", (req, res) => {
    res.render("index")
})
app.get("/about", (req, res) => {
    res.render("about")
})
app.get("/contact", (req, res) => {
    res.render("contact",{show:false})
})


app.post("/contact",encoder, (req, res) => {
    let mailOptions={
        from: "aakibsaifi938@gmail.com" , // sender address
    to:req.body.email, // list of receivers
    subject:req.body.subject, // Subject line
        html: `<h2>Thanks</h2>
        <h3>Your Query Received</h3>
        <h4>Our Team Will Contact You Soon</h4>
        <h4>You Can Visit Our Office at your Appointment Time ${req.body.appointment}</h4>
        `
    }
    transporter.sendMail(mailOptions,((error)=>{
    if(error)
    {
        console.log(error)
    }}
    ))
    mailOptions={
        from: "aakibsaifi938@gmail.com" , 
    to:"aakibsaifi938@gmail.com",
    subject:"New Query Received", 
        html: `
        <h3>New Query Received</h3>
        <table border=1 cellpadding=10>
        <tbody>
        <tr>
        <th>Name</th><td>${req.body.name}</td>
        </tr>
        <tr>
        <th>Email</th><td>${req.body.email}</td>
        </tr>
        <tr>
        <th>Phone Number</th><td>${req.body.number}</td>
        </tr>
         <tr>
        <th>Appointment time </th><td>${req.body.appointment}</td>
        </tr>
        <tr>
        <th>Subject</th><td>${req.body.subject}</td>
        </tr>
        <tr>
        <th>Message</th><td>${req.body.message}</td>
        </tr>
        </tbody>
        </table>
        `
    }
    transporter.sendMail(mailOptions,((error)=>{
        if(error)
        {
            console.log(error)
        }}
        ))
    res.render("contact",{show:true})
    console.log(req.body)
})


app.get("/service", (req, res) => {
    res.render("service")
})
app.get("/feature", (req, res) => {
    res.render("feature")
})
app.get("/training", (req, res) => { 
    res.render("training")
})
app.get("/testimonial", (req, res) => {
    res.render("testimonial")
})
let port=process.env.PORT || 8000
app.listen(port, console.log("Server is Running at http://localhost:8000"))