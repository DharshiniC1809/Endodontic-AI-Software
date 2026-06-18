const User =
    require("../models/User");

const nodemailer =
    require("nodemailer");

const transporter =
    nodemailer.createTransport({

        service: "gmail",

        auth: {

            user: process.env.EMAIL_USER,

            pass: process.env.EMAIL_PASS

        }

    });

const signup = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        const existingUser =
            await User.findOne({
                email
            });

        if (existingUser) {

            return res.status(400).json({

                success: false,
                message:
                    "Email already exists"

            });

        }

        const user =
            await User.create({

                name,
                email,
                password

            });

        res.status(201).json({

            success: true,
            message:
                "User registered successfully",

            user

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email
        });

        if (!user) {

            return res.status(400).json({
                success: false,
                message: "User not found"
            });

        }

        if (user.password !== password) {

            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });

        }

        res.status(200).json({

            success: true,
            message: "Login successful",

            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};

const updateProfile = async (req, res) => {

    try {

        const {
            userId,
            name,
            email
        } = req.body;

        const user =
            await User.findByIdAndUpdate(
                userId,
                {
                    name,
                    email
                },
                {
                    new: true
                }
            );

        res.status(200).json({

            success: true,

            message:
                "Profile updated successfully",

            user

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};

const forgotPassword = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user =
            await User.findOne({
                email
            });

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"

            });

        }

        user.password = password;

        await user.save();

        res.status(200).json({

            success: true,
            message: "Password updated successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};

const changePassword = async (req, res) => {

    try {

        const {
            userId,
            currentPassword,
            newPassword
        } = req.body;

        const user =
            await User.findById(userId);

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"

            });

        }

        if (
            user.password !== currentPassword
        ) {

            return res.status(400).json({

                success: false,
                message: "Current password incorrect"

            });

        }

        user.password = newPassword;

        await user.save();

        res.status(200).json({

            success: true,
            message: "Password changed successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};

const sendOTP = async (req, res) => {

    try {

        const { email } = req.body;

        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "Email not found"

            });

        }

        const otp =
            Math.floor(
                100000 + Math.random() * 900000
            ).toString();

        user.otp = otp;

        user.otpExpiry =
            Date.now() + 5 * 60 * 1000;

        await user.save();

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: email,

            subject: "Endodontic AI Password Reset OTP",

            html: `
                <h2>Password Reset OTP</h2>
                <p>Your OTP is:</p>
                <h1>${otp}</h1>
                <p>Valid for 5 minutes.</p>
            `

        });

        res.status(200).json({

            success: true,
            message: "OTP sent successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};

const verifyOTP = async (req, res) => {

    try {

        const {
            email,
            otp
        } = req.body;

        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"

            });

        }

        if (user.otp !== otp) {

            return res.status(400).json({

                success: false,
                message: "Invalid OTP"

            });

        }

        if (new Date() > user.otpExpiry) {

            return res.status(400).json({

                success: false,
                message: "OTP expired"

            });

        }

        res.status(200).json({

            success: true,
            message: "OTP verified"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};

const resetPassword = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"

            });

        }

        user.password = password;

        user.otp = null;

        user.otpExpiry = null;

        await user.save();

        res.status(200).json({

            success: true,
            message: "Password reset successful"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};

module.exports = {
    signup,
    login,
    updateProfile,
    changePassword,
    sendOTP,
    verifyOTP,
    resetPassword
};
