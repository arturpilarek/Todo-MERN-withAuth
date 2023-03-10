const User = require("../../models/UserModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
    let { username, password, displayName } = req.body;

    try {
        // check if the user already exists
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ msg: 'Username already exists' });

        if (!displayName) displayName = username;

        // create new user
        user = new User({
            username,
            password,
            displayName
        });

        // hash user password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // return jwt
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '7 days' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}