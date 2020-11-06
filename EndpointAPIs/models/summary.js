const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const summarySchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: false
    }
},{
    timestamps: true
});

var Summary = mongoose.model("Summary", summarySchema);

module.exports = Summary;