const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const ReportSchema = new mongoose.Schema({
    userid: {
        type: ObjectId,
        ref : "User"
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
        require: true,
    },
    curstatus:{
        type : String,
        require: true,
    }

})


module.exports = mongoose.model('Reports',ReportSchema);


