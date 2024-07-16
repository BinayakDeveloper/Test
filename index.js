const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({
  path: "./secret.env",
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    methods: ["GET", "POST"],
  })
);

const { PORT, APP_PASSWORD } = process.env;

app.get("/", (req, res) => {
  res.status(201).json({
    message: "Welcome To Binayak Service",
  });
});

app.get("/sendMail", (req, res) => {
  res.status(201).json({
    message: "Use POST Request",
  });
});

app.post("/sendMail", async (req, res) => {
  let { name, email, contact, query } = req.body;
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bbrsdkl@gmail.com",
      pass: APP_PASSWORD,
    },
  });
  try {
    await transport.sendMail({
      from: email,
      to: "bbrsdkl@gmail.com",
      subject: name + " Query",
      html: `<h1 align="center">${name} Query</h1><h3>Name:- ${name}</h3><h3>Email:- ${email}</h3><h3>Contact:- ${contact}</h3><br><h3>Query:-</h3<br><p>${query}</p>`,
    });
    res.status(201).json({
      message: "Mail Sent Successfully",
    });
  } catch (err) {
    if (err) {
      res.json({
        message: err,
      });
    }
  }
});

app.listen(PORT);
