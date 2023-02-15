const User = require("../../models/UserModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the user exists
        let user = await User.findOne({ email });

        //Here add new userData to be returned
        const userData = {
            displayName: user.displayName
        }
        if (!user) return res.status(400).json({ msg: 'This user does not exist' });


        // Check is the encrypted password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Email or password incorrect' });


        // Return JWT payload
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '30 days' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, userData });
                console.log('Login successful')
            }
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}