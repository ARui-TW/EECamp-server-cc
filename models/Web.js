const mongoose = require("mongoose");

const pageImage = mongoose.Schema({
    url: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
});

const FAQ = mongoose.Schema({
    Ques: {
        type: String,
        required: false,
    },
    Ans: {
        type: String,
        required: false,
    },
});

const WebSchema = mongoose.Schema({
    logo: {
        type: String,
        required: false,
    },
    frontPageImage: {
        type: [pageImage],
        required: false,
    },
    FAQ: {
        type: [FAQ],
        required: false,
    },
    shirtImage: {
        type: String,
        required: false,
    },
    campName: {
        type: String,
        required: false,
    },
    campPeople: {
        type: Number,
        required: false,
    },
    campTime: {
        type: String,
        required: false,
    },

    campRegister: {
        type: String,
        required: false,
    },
    convenor: {
        type: String,
        required: false,
    },
    convenorPhone: {
        type: Number,
        required: false,
    },
    inCharge: {
        type: String,
        required: false,
    },
    inChargePhone: {
        type: Number,
        required: false,
    },
    remittanceAccName: {
        type: String,
        required: false,
    },
    registerFee: {
        type: Number,
        required: false,
    },
    AnnounceTime: {
        type: String,
        required: false,
    },
    remittanceTime: {
        type: String,
        required: false,
    },
    refundFifty: {
        type: String,
        required: false,
    },
    refundTwenty: {
        type: String,
        required: false,
    },
    RecapVlog: {
        type: String,
        required: false,
    },
    albumSite: {
        type: String,
        required: false,
    },
    // 忘記這兩個是幹嘛的了
    isRegistering: {
        type: Boolean,
        required: false,
    },
    isFillingUp: {
        Boolean,
        required: false,
    },
});

module.exports = mongoose.model("Web", WebSchema);
