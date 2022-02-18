const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    isAdmin: {
        type: Boolean,
        required: true,
    },
    chineseName: {
        type: String,
        required: true,
    },
    idNumber: {
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
        required: true,
    },
    bloodType: {
        type: String,
        required: true,
    },
    school: {
        type: String,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    homeNumber: {
        type: Number,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    emergencyName: {
        type: String,
        required: true,
    },
    emergencyPhoneNumber: {
        type: Number,
        required: true,
    },
    zipCode: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    shirtSize: {
        type: String,
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
});

UserSchema.index({ created_at: 1 });

module.exports = mongoose.model("User", UserSchema);
