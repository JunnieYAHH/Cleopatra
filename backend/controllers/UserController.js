const User = require('../models/user');
const sendToken = require('../utils/jwtToken');


exports.registerUser = async (req, res, next) => {
    // const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: 'avatars',
    //     width: 150,
    //     crop: "scale"
    // }, (err, res) => {
    //     console.log(err, res);
    // });
    const { name, email, password, role } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        // avatar: {
        //     public_id: result.public_id,
        //     url: result.secure_url
        // },

        // role,
    })

    // const token = user.getJwtToken();
    if (!user) {
        return res.status(500).json({
            success: false,
            message: 'user not created'
        })
    }
    sendToken(user, 200, res)

}

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    // Checks if email and password is entered by user
    if (!email || !password) {
        return res.status(400).json({ error: 'Please enter email & password' })
    }
    // Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return res.status(401).json({ message: 'Invalid Email or Password' })
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.status(401).json({ message: 'Invalid Email or Password' })
    }

    sendToken(user, 200, res)
}

exports.logoutUser = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
}


exports.getUserProfile = async (req, res, next) => {
    // console.log(req.header('authorization'))
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
}


exports.getUserDetails = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(400).json({ message: `User does not found with id: ${req.params.id}` })
        // return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
}