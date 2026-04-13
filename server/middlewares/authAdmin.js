import jwt from 'jsonwebtoken';

export const authAdmin = async (req, res, next) => {
    try {
        const admin_token = req.headers.admin_token;

        if (!admin_token) {
            return res.json({ success: false, message: "Not Authorized. Login Again" });
        }

        const token_decode = jwt.verify(admin_token, process.env.JWT_SECRET);

        if (token_decode !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: "Not Authorized. Login Again" });
        }

        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
