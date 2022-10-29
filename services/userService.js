const User = require('../models/User');
const { hash, compare } = require('bcrypt');


async function register(fullName, password, username) {
    const existing = await getUserByUsername(username);

    if(existing) {
        throw new Error('Incorrect username or password');
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        fullName,
        hashedPassword,
        username
    });
    await user.save();

    return user;
}

async function login(username, password) {
    const user = await getUserByUsername(username);

    if(!user) {
        throw new Error('User dosent exist');
    }

    const hasMatch = await compare(password, user.hashedPassword);

    if(!hasMatch) {
        throw new Error('Incorrect username or password');
    }

    return user;
}

async function getUserByUsername(username) {
    const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });

    return user;
}

module.exports = {
    login,
    register,
}