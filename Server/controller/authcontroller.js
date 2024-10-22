import userModel from "../model/userSchema.js";
import emailValidator from "email-validator";
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

const signup = async (req, res, next) => {
    const { name, email, password, confirmPassword, username, bio } = req.body; // Include username and bio

    console.log(name, email, password, confirmPassword, username, bio); // Log all fields for debugging

    // Check if all required fields are provided
    if (!name || !email || !password || !confirmPassword || !username || !bio) {
        return res.status(400).json({
            success: false,
            message: "Every field is required"
        });
    }

    // Validate email format
    const validEmail = emailValidator.validate(email);
    if (!validEmail) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email"
        });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Password and Confirm Password do not match"
        });
    }

    try {
        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user instance with hashed password
        const userInfo = new userModel({
            ...req.body, // Spread the req.body
            password: hashedPassword  // Replace the plain-text password with hashed password
        });

        // Save the user to the database
        const result = await userInfo.save();

        // Return successful response, omitting sensitive data like password
        res.status(200).json({
            success: true,
            data: {
                name: result.name,
                email: result.email,
                username: result.username,
                bio: result.bio
            }
        });

    } catch (error) {
        // Handle duplicate email error (error code 11000)
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Account already exists with provided email"
            });
        }

        // General error handling
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export default signup;
