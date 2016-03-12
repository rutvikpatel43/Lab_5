"use strict";
var mongoose = require('mongoose');
// DEFINE THE OBJECT SCHEMA
var userSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        default: '',
        trim: true,
        required: 'Username is required'
    },
    password: {
        type: String,
        default: '',
        trim: true,
        required: 'Password is required'
    },
    repassword: {
        type: String,
        default: '',
        trim: true,
        required: 'Re-Password is required'
    }
});
// MAKE THIS PUBLIC SO THE CONTROLLER CAN SEE IT
exports.user = mongoose.model('user', userSchema);

//# sourceMappingURL=user.js.map
