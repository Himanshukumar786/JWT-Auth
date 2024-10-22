import userModel from "../model/userSchema.js";

const signup = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    console.log(name, email, password, confirmPassword);

    try{
        const userInfo = userModel(req.body);
        const result = await userInfo.save();

        res.status(200).json({
            success: true,
            data: {}
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Account already exists with provided email"
            });
        }
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
};

export default signup;