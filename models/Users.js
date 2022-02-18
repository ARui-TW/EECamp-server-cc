import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
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
    // nickName: {
    //     type: String,
    //     required: false,
    // },
    // birthday: {
    //     type: String,
    //     required: true,
    // },
    email: {
        type: String,
        required: true,
    },
    // gender: {
    //     type: String,
    //     required: true,
    // },
    // bloodType: {
    //     type: String,
    //     required: true,
    // },
    // school: {
    //     type: String,
    //     required: true,
    // },
    // grade: {
    //     type: String,
    //     required: true,
    // },
    // homeNumber: {
    //     type: Number,
    //     required: true,
    // },
    // phoneNumber: {
    //     type: Number,
    //     required: true,
    // },
    // emergencyName: {
    //     type: String,
    //     required: true,
    // },
    // emergencyPhoneNumber: {
    //     type: Number,
    //     required: true,
    // },
    // zipCode: {
    //     type: Number,
    //     required: true,
    // },
    // address: {
    //     type: String,
    //     required: true,
    // },
    // shirtSize: {
    //     type: String,
    //     required: true,
    // },
    // vegan: {
    //     type: Boolean,
    //     required: true,
    // },
    // specialDiet: {
    //     type: String,
    //     required: true,
    // },
    // specialDisease: {
    //     type: String,
    //     required: true,
    // },
    // selfIntro: {
    //     type: String,
    //     required: true,
    // },
    // motivation: {
    //     type: String,
    //     required: true,
    // },
    // previousCamp: {
    //     type: String,
    //     required: false,
    // },
    // howYouKnow: {
    //     type: String,
    //     required: false,
    // },
    // sthToSay: {
    //     type: String,
    //     required: false,
    // },
    status: {
        type: String,
        required: true,
        // notChosen / maybeChosen / Chosen
        default: "notChosen",
    },
});

UserSchema.index({ created_at: 1 });

UserSchema.pre("save", function (next) {
    if (!this.isModified("email")) return next;
    bcrypt.hash(this.email, 10, (err, emailHash) => {
        if (err) return next(err);
        this.email = emailHash;
        next();
    });
});

// UserSchema.methods.comparePassword = function (password, callback) {
//     bcrypt.compare(password, this.email, (err, isMatch) => {
//         if (err) return callback(err);
//         else {
//             if (!isMatch) return callback(null, isMatch);
//             return callback(null, this);
//         }
//     });
// };

export default mongoose.model("User", UserSchema);
