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
        user: 'pnkvlog1508@gmail.com', // Email của bạn
        pass: 'vpkl kqao sztj evdi'     // Mật khẩu ứng dụng từ Google
    }
});

// API endpoint
app.get("/",(req,res) => {
    res.redirect("index.html")
})
app.post('/api/contact', async (req, res) => {
    const formData = req.body;
    const myEmail = 'pnkvlog1508@gmail.com'
    console.log(formData)
    // Tạo nội dung email
    const mailOptions = {
        from: myEmail,    // Email của bạn
        to: 'khoapnse183214@fpt.edu.vn',      // Email nhận
        subject: 'New Contact Form Submission',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px; background-color: #f9f9f9;">
                <h2 style="color: #333; text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Contact Form Message</h2>
                
                <div style="background: white; padding: 20px; border-radius: 5px; margin-top: 20px;">
                    <div style="margin-bottom: 15px;">
                        <label style="color: #666; font-size: 14px;">Name:</label>
                        <p style="color: #333; font-size: 16px; margin: 5px 0; padding: 8px; background: #f5f5f5; border-radius: 4px;">${formData.name}</p>
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <label style="color: #666; font-size: 14px;">Email:</label>
                        <p style="color: #333; font-size: 16px; margin: 5px 0; padding: 8px; background: #f5f5f5; border-radius: 4px;">${formData.email}</p>
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <label style="color: #666; font-size: 14px;">Phone:</label>
                        <p style="color: #333; font-size: 16px; margin: 5px 0; padding: 8px; background: #f5f5f5; border-radius: 4px;">${formData.phone}</p>
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <label style="color: #666; font-size: 14px;">Message:</label>
                        <p style="color: #333; font-size: 16px; margin: 5px 0; padding: 8px; background: #f5f5f5; border-radius: 4px; white-space: pre-wrap;">${formData.message}</p>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
                    <p>This is an automated message from your contact form</p>
                </div>
            </div>
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