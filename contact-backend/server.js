// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('✅ Server backend aktif. Silakan POST ke /api/contact');
});

// Konfigurasi transporter untuk Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,             // Email pengirim
    pass: process.env.EMAIL_APP_PASSWORD,     // App password Gmail
  }
});

// Verifikasi transporter
transporter.verify((err, success) => {
  if (err) {
    console.error('Mailer error:', err);
  } else {
    console.log('📬 Mailer siap!');
  }
});

// Route untuk mengirim email
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validasi input
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Semua kolom harus diisi.' });
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: '📩 Pesan Baru dari Form Kontak',
      text: message,
    });

    res.status(200).json({ success: true, message: 'Pesan berhasil dikirim!' });
  } catch (error) {
    console.error('Gagal mengirim email:', error);
    res.status(500).json({ success: false, message: 'Gagal mengirim pesan.' });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
