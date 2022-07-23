const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    try {

        const { email, password, confirmPassword } = req.body;
        if (!email || !password || !confirmPassword) {
            return res.status(400).send({
                message: "Please fill all mandatory fields",
            });
        }

        let checkUserExist = await user.findOne({ email });

        if (checkUserExist) {
            return res.status(400).send({
                message: "User already exist, please try login",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).send({
                message: "password and confirm password must be same.",
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        let createUser = await user.create({
            email: email,
            password: hashedPassword,
        });
        if (!createUser) {
            return res.status(400).send({
                message: "Something went wrong!",
            });
        }

        return res.status(200).send({
            message: `Wohoo! you have registered with us Successfully, Now please login`,
        });

    } catch (error) {
        console.error("🚀 ~ file: AuthController.js ~ signUp ~ error", error)
        throw new Error(error);
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                message: "Please fill all mandatory fields",
            });
        }

        let getUserDetails = await user.findOne({ email });
        if (!getUserDetails) return res.status(404).send({ message: "User not found!" })


        if (!(await bcrypt.compare(password, getUserDetails.password))) {
            return res
                .status(401)
                .send({ message: "Password is Incorrect" });
        }

        const id = getUserDetails._id;
        const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true, //To prevent from XSS attack
        };

        res.cookie("jwt", token, cookieOptions);
        return res.status(200).send({
            message: `Wohoo! you have logged in Successfully.`,
        });

    } catch (error) {
        console.error("🚀 ~ file: AuthController.js ~ signIn ~ error", error)
        throw new Error(error);
    }
}

const signOut = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.json({
            message: "User Logged Out Successfully",
        });
    } catch (error) {
        console.error("🚀 ~ file: AuthController.js ~ signOut ~ error", error)
        throw new Error(error);
    }
};

module.exports = {
    signUp,
    signIn,
    signOut
}