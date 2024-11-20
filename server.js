const express = require('express');
const cors = require('cors');
const app = express();
const nodemailer = require('nodemailer');
// Middleware
app.use(cors());
app.use(express.json());


app.use(express.static('public'));
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Sử dụng Gmail
    auth: {
        user: 'your.email@gmail.com', // Email của bạn
        pass: 'your-app-password'     // Mật khẩu ứng dụng từ Google
    }
});

// API endpoint
app.get("/",(req,res) => {
    res.redirect("index.html")
})
app.post('/api/contact', async (req, res) => {
    const formData = req.body;
    const myEmail = 'pnkvlog1508@gmail.com'
    // Tạo nội dung email
    const mailOptions = {
        from: req.body.email,    // Email của bạn
        to: myEmail,      // Email nhận
        subject: 'New Contact Form Submission',
        html: `
            <h3>New Contact Form Message</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Message:</strong> ${formData.message}</p>
        `
    };

    try {
        // Gửi email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.json({ message: 'Form data received and email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});