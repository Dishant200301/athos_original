import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  companyName: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  subject: {
    type: String,
    trim: true
  },
  product: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message content is required'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
