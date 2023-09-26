const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({    
    email: {
        type: String,
    },    
    phone: {
        type: String,
    },
    password: {
        type: String,
    },    
    active:{
        type:String
    },
}, {
    versionKey: false,
    timestamps: true,
},);

const User = mongoose.model("User", UserSchema);

module.exports = User;