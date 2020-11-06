const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tag = new Schema(
{
    tag_name : {
        type: String,
        required: false,
        default: "General"
    }
});

const information = new Schema({
    url: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    modifiedBy: {
        type: String,
        required: true
    },
    star: {
        type: Boolean,
        required: true,
        default: false
    }
},
{
    timestamps: true
});

const infoBookmarkSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },             
    informationFolder : {
        type: String,
        required: true,
        default: 'main'
    },
    createdBy: {
        type: String,
        required: true,
    },
    modifiedBy: {
        type: String,
        required: true,
    },
    contentList : [information],
    tags : [tag]
},{
    timestamps: true
});

var infoBookmark = mongoose.model("infoBookmark", infoBookmarkSchema);

module.exports = infoBookmark;
