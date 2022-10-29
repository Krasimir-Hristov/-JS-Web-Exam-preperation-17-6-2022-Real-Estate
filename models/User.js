const { Schema, model } = require('mongoose');



const userSchema = new Schema({
    fullName: { type: String, require: true },
    hashedPassword: { type: String, require: true },
    username: { type: String, require: true, minlength: [5, 'Username must be at least 5 characters long'] },
});


userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;