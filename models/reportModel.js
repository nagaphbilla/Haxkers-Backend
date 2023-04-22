const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const ReportSchema = new mongoose.Schema({
    userid: {
        type: ObjectId,
        ref : "User",
        required : true
    },
    location: {
        type: {},
        required: true,
    },
    picurl: {
        type: String,
        required: true,
    },
    cat: {
        type: String,
        required: true,
    },
    curstatus:{
        type : String,
        default : "Pending",
        required: true,
    }

})


module.exports = mongoose.model('Reports',ReportSchema);


