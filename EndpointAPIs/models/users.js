const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const infoBookmark = require("./infoBookmark");
const summarySchema = require("./summary");

const userSchema = new Schema({
    user_email : {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

var Users = mongoose.model("User", userSchema);

module.exports = Users;