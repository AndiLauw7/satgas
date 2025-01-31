const nodemailer = require("nodemailer");
require("dotenv").config();

const emailTransfer = nodemailer.createTransport({
  // service: "gmail",
  host: "smtp.gmail.com",
  // port: 587,
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendEmailKePelapor = async (email, nama_pelapor, status_laporan) => {
  try {
    await emailTransfer.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Update Status Laporan",
      html: `
        <h3>Halo ${nama_pelapor},</h3>
        <p>Terkait dengan laporan yang dikirimkan melalui website Satgas PKKS Unipi laporan kamu sudah : <strong>${status_laporan}</strong>.</p>
        <p>Tunggu info selanjutnya terkait update dari laporan yang kamu kirimkan.</p>
        <p>Admin Satgas PPKS.</p>
        <p>Terima kasih telah menggunakan layanan kami.</p>
      `,
    });
    console.log("Email berhasil dikirim ke:", email);
    console.log("nama pelapor", nama_pelapor);
    console.log("status laporan ", status_laporan);
  } catch (error) {
    console.error("Gagal mengirim email:", error);
  }
};
module.exports = { sendEmailKePelapor };
