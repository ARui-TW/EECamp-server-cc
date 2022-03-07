import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  chineseName: {
    type: String,
    required: true,
  },
  photoPath: {
    type: String,
    required: true,
  },
  consentPath: {
    type: String,
    required: false,
    default: '',
  },
  personalID: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
    required: false,
  },
  birthday: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['男', '女'],
    required: true,
  },
  bloodType: {
    type: String,
    enum: ['A', 'B', 'AB', 'O', '未驗血'],
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    enum: ['一年級', '二年級', '三年級'],
    required: true,
  },
  homeNumber: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  emergencyName: {
    type: String,
    required: true,
  },
  emergencyPhoneNumber: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  shirtSize: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', '2L', '3L', '4L', '5L'],
    required: true,
  },
  vegan: {
    type: Boolean,
    required: true,
  },
  specialDiet: {
    type: String,
    required: true,
  },
  specialDisease: {
    type: String,
    required: true,
  },
  selfIntro: {
    type: String,
    required: true,
  },
  motivation: {
    type: String,
    required: true,
  },
  previousCamp: {
    type: String,
    required: false,
  },
  howYouKnow: {
    type: String,
    required: false,
  },
  sthToSay: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['NotChosen', 'Alternate', 'Paid', 'Unpaid', 'GaveUp'],
    required: true,
    default: 'NotChosen',
  },
  alternateNum: {
    type: Number,
    required: false,
  },
  paidTime: {
    type: String,
    required: false,
    default: '',
  },
  paidAmount: {
    type: String,
    required: false,
    default: '',
  },
  paidMethod: {
    type: String,
    required: false,
    default: '',
  },
  paidAccount: {
    type: String,
    required: false,
    default: '',
  },
  paidName: {
    type: String,
    required: false,
    default: '',
  },
  paidNote: {
    type: String,
    required: false,
    default: '',
  },
  comeMethod: {
    type: String,
    required: false,
    default: '',
  },
  comeTime: {
    type: String,
    required: false,
    default: '',
  },
  leaveMethod: {
    type: String,
    required: false,
    default: '',
  },
  leaveTime: {
    type: String,
    required: false,
    default: '',
  },
});

UserSchema.index({ status: 1 });

export default mongoose.model('User', UserSchema);
