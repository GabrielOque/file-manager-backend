import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "iiue2024@gmail.com",
    pass: "omkp iwmy zmzj vbhd",
  },
  tls: {
    rejectUnauthorized: false,
  },
  debug: true,
});
