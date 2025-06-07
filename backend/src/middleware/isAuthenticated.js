import jwt from "jsonwebtoken"
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "User not authenticated" })
        }
        // console.log("token generated");
        // console.log(`Request URL: ${req.originalUrl}`);
        //verifying the token
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!decode) {
            return res.status(401).json({ message: "Invalid Token" })
        }
        // console.log("decode is", decode);
        //user id store
        req.id = decode.userId
        // console.log("token verified");
        next()
    } catch (error) {
        // console.log(error, "error at middleware");

    }
}
export default isAuthenticated