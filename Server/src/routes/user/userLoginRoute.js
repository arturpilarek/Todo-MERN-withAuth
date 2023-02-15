const User = require("../../models/UserModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
    const { email, password } = req.body;
    try {
        // check if the user exists
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'This user does not exist' });


        // check is the encrypted password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Email or password incorrect' });


        // return jwt
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
                res.json({ token });
                console.log('Login successful')
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}