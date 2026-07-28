import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import connectDB from './config/db.js';
import Inquiry from './models/Inquiry.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Set up CORS
const corsOrigin = process.env.CORS_ORIGIN;
const corsOptions = {
  origin: (origin, callback) => {
    // If CORS_ORIGIN is empty, or equals "*", allow all origins
    if (!corsOrigin || corsOrigin === '*' || corsOrigin.trim() === '') {
      callback(null, true);
    } else {
      const allowedOrigins = corsOrigin.split(',').map(o => o.trim().toLowerCase());
      if (!origin || allowedOrigins.includes(origin.toLowerCase())) {
        callback(null, true);
      } else {
        // Log CORS rejection but don't break simple client tests.
        console.warn(`CORS rejected for origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Heartbeat endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Post inquiry handler
const handleInquirySubmission = async (req, res) => {
  try {
    const { companyName, name, email, subject, product, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, and message.'
      });
    }

    // 1. Store inquiry response in MongoDB
    let savedInquiry = null;
    try {
      const newInquiry = new Inquiry({
        companyName,
        name,
        email,
        subject,
        product,
        message
      });
      savedInquiry = await newInquiry.save();
      console.log('Inquiry successfully saved in MongoDB:', savedInquiry._id);
    } catch (dbError) {
      console.error('Failed to save inquiry to MongoDB:', dbError.message);
      // We will still try to send the email even if DB fails, but we note the error
    }

    // 2. Setup SMTP Mail Transporter
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const isGmail = smtpHost.includes('gmail.com');
    
    // Gmail App Passwords commonly include spaces which should be stripped
    const smtpPass = (isGmail && process.env.SMTP_PASS)
      ? process.env.SMTP_PASS.replace(/\s+/g, '')
      : process.env.SMTP_PASS;

    const smtpConfig = isGmail
      ? {
          service: 'gmail',
          auth: {
            user: process.env.SMTP_USER,
            pass: smtpPass
          }
        }
      : {
          host: smtpHost,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: smtpPass
          }
        };

    const transporter = nodemailer.createTransport(smtpConfig);

    // 3. Construct premium HTML email body
    const emailHtmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Inquiry for Athos Collagen</title>
      <style>
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background-color: #f7fafc;
          margin: 0;
          padding: 0;
          color: #333333;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #1d81a5 0%, #135d79 100%);
          color: #ffffff;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          letter-spacing: -0.5px;
        }
        .header p {
          margin: 8px 0 0 0;
          font-size: 14px;
          opacity: 0.9;
        }
        .content {
          padding: 30px;
        }
        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #1d81a5;
          margin-bottom: 20px;
          border-bottom: 1px solid #edf2f7;
          padding-bottom: 8px;
        }
        .grid {
          margin-bottom: 24px;
        }
        .field-group {
          background-color: #f8fafc;
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid #edf2f7;
          margin-bottom: 12px;
        }
        .label {
          font-size: 11px;
          font-weight: 600;
          color: #718096;
          text-transform: uppercase;
          margin-bottom: 4px;
          letter-spacing: 0.5px;
        }
        .value {
          font-size: 15px;
          color: #2d3748;
          font-weight: 500;
        }
        .message-box {
          background-color: #f8fafc;
          padding: 16px;
          border-radius: 8px;
          border-left: 4px solid #1d81a5;
          font-size: 14px;
          line-height: 1.6;
          color: #2d3748;
          white-space: pre-wrap;
        }
        .footer {
          background-color: #f1f5f9;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
          border-top: 1px solid #edf2f7;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Inquiry Received</h1>
          <p>You have one inquiry for Athos Collagen</p>
        </div>
        <div class="content">
          <div class="section-title">Inquiry Contact Information</div>
          <div class="grid">
            <div class="field-group">
              <div class="label">Full Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="field-group">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${email}" style="color: #1d81a5; text-decoration: none;">${email}</a></div>
            </div>
            <div class="field-group">
              <div class="label">Company Name</div>
              <div class="value">${companyName || 'Not Provided'}</div>
            </div>
            <div class="field-group">
              <div class="label">Product Interest</div>
              <div class="value">${product || 'Not Specified'}</div>
            </div>
            <div class="field-group">
              <div class="label">Subject</div>
              <div class="value">${subject || 'Inquiry from Athos Website'}</div>
            </div>
          </div>
          <div class="section-title">Message Detail</div>
          <div class="message-box">${message}</div>
        </div>
        <div class="footer">
          <p>This notification was sent automatically from the server because a client submitted the contact form.</p>
        </div>
      </div>
    </body>
    </html>
    `;

    // 4. Send email to admin
    const mailOptions = {
      from: `"${process.env.FROM_NAME || 'Athos Collagen'}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
      to: process.env.FROM_EMAIL || process.env.SMTP_USER, // sends to the admin email
      subject: `New Inquiry: ${subject || 'Athos Collagen Submission'}`,
      html: emailHtmlBody
    };

    let mailSentSuccessfully = false;
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email notification sent successfully to admin:', info.messageId);
      mailSentSuccessfully = true;
    } catch (mailError) {
      console.error('SMTP Mail transmission failure:', mailError.message);
      // We will return success: false if the mail delivery failed and DB failed
      if (!savedInquiry) {
        return res.status(500).json({
          success: false,
          message: 'Failed to process inquiry. Both Database storage and Mail notification failed.'
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry processed successfully!',
      dbSaved: !!savedInquiry,
      mailSent: mailSentSuccessfully
    });

  } catch (error) {
    console.error('Internal server error processing contact inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error processing the inquiry.'
    });
  }
};

// Handle both standard and api prefix routes for maximum robustness
app.post('/contact', handleInquirySubmission);
app.post('/api/contact', handleInquirySubmission);

// Port setup
const PORT = process.env.PORT || 7013;
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
