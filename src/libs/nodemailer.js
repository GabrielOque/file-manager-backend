import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "iiue2024@gmail.com",
    pass: "omkp iwmy zmzj vbhd",
  },
});
