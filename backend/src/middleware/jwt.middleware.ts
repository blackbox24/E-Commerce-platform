import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "secret-here";


export interface AuthRequest extends Request{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user?:any;
}

const authMiddleware = async (req: AuthRequest, resp: Response, next: NextFunction) => {
    try{
        let token = req.cookies.accessToken;
        
        if (!token) {
            const {authorization} = req.headers;
            if(authorization && authorization.startsWith("Bearer")){
                token = authorization.split(" ")[1];
            }
        }

        if(!token){
            return resp.status(401).json({message:"Authorization required!"})
        }
        
        const decode = jwt.verify(token as string,JWT_SECRET as string);

        req.user = decode;
        next();
    }catch(error) {
        // Handle expired or malformed tokens specifically
        console.error(error)
        return resp.status(403).json({ message: "Invalid or expired token!" });
    }
}


export default authMiddleware