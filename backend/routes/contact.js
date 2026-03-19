const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, company, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
  }

  // If no email config, just log and return success (demo mode)
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail  = process.env.CONTACT_EMAIL || 'info@nhattrithanh.vn';

  if (!smtpUser || !smtpPass) {
    // Demo mode: log and return success
    console.log('[Contact Form] New message:');
    console.log(`  From: ${name} <${email}> ${company ? `(${company})` : ''}`);
    console.log(`  Phone: ${phone || 'N/A'}`);
    console.log(`  Subject: ${subject}`);
    console.log(`  Message: ${message}`);
    return res.json({ success: true, demo: true });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // hoặc dùng SMTP host tùy chọn
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `"Website Nhật Trí Thành" <${smtpUser}>`,
      to: toEmail,
      replyTo: email,
      subject: `[Liên hệ website] ${subject} - ${name}`,
      html: `
        <h2 style="color:#C40000">Tin nhắn mới từ website Nhật Trí Thành</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;width:140px">Họ tên</td><td style="padding:8px;border:1px solid #eee">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Công ty</td><td style="padding:8px;border:1px solid #eee">${company || 'N/A'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Email</td><td style="padding:8px;border:1px solid #eee"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Điện thoại</td><td style="padding:8px;border:1px solid #eee">${phone || 'N/A'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Chủ đề</td><td style="padding:8px;border:1px solid #eee">${subject}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;vertical-align:top">Nội dung</td><td style="padding:8px;border:1px solid #eee;white-space:pre-wrap">${message}</td></tr>
        </table>
        <p style="color:#888;font-size:12px;margin-top:20px">Email này được gửi tự động từ website nhattrithanh.vn</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('[Contact Email Error]', err.message);
    res.status(500).json({ error: 'Không thể gửi email. Vui lòng thử lại.' });
  }
});

module.exports = router;
