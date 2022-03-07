import mongoose from 'mongoose';

const FAQ = new mongoose.Schema({
  Ques: {
    type: String,
    required: true,
  },
  Ans: {
    type: String,
    required: true,
  },
});

const WebSchema = new mongoose.Schema({
  FAQ: {
    type: [FAQ],
    required: true,
  },
  campName: {
    type: String,
    required: true,
  },
  campPeople: {
    type: Number,
    required: true,
  },
  campTime: {
    type: String,
    required: true,
  },
  campRegister: {
    type: String,
    required: true,
  },
  convenor: {
    type: String,
    required: true,
  },
  convenorPhone: {
    type: String,
    required: true,
  },
  inCharge: {
    type: String,
    required: true,
  },
  inChargePhone: {
    type: String,
    required: true,
  },
  remittanceAccName: {
    type: String,
    required: true,
  },
  registerFee: {
    type: Number,
    required: true,
  },
  AnnounceTime: {
    type: String,
    required: true,
  },
  remittanceTime: {
    type: String,
    required: true,
  },
  refundFifty: {
    type: String,
    required: true,
  },
  refundTwenty: {
    type: String,
    required: true,
  },
  RecapVlog: {
    type: String,
    required: true,
  },
  albumSite: {
    type: String,
    required: true,
  },
  RegisterStatus: {
    type: String,
    enum: ['register', 'fillingUp', 'done'],
    default: 'register',
  },
});

export default mongoose.model('Web', WebSchema);
