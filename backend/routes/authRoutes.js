const express =
    require("express");

const {
    signup,
    login,
    updateProfile,
    changePassword,
    sendOTP,
    verifyOTP,
    resetPassword
} = require(
    "../controllers/authController"
);

const router =
    express.Router();

router.post(
    "/signup",
    signup
);

router.post(
    "/login",
    login
);

router.post(
    "/send-otp",
    sendOTP
);

router.post(
    "/verify-otp",
    verifyOTP
);

router.post(
    "/reset-password",
    resetPassword
);

router.put(
    "/profile",
    updateProfile
);

router.post(
    "/change-password",
    changePassword
);

module.exports =
    router;