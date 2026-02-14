import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "secret-here";


interface AuthRequest extends Request{
    user?:any;
}

const authMiddleware = async (req: AuthRequest, resp: Response, next: NextFunction) => {
    try{
        const {authorization} = req.headers;
        if(!authorization || !authorization.startsWith("Bearer")){
            return resp.status(401).json({message:"Authorization required!"})
        }
        const token = authorization?.split(" ")[1];
        const decode = jwt.verify(token as string,JWT_SECRET as string);

        req.user = decode;
        next();
    }catch(error) {
        // Handle expired or malformed tokens specifically
        return resp.status(403).json({ message: "Invalid or expired token!" });
    }
}


export default authMiddleware