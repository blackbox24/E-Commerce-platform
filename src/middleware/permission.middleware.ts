import type {Response, NextFunction} from "express";
import type { AuthRequest } from "./jwt.middleware.ts";

export const checkAdminRole = async(req: AuthRequest, resp: Response, next: NextFunction) => {
    try {
        const role = req.user.role;
        if(role !== "admin"){
            return resp.status(403).json({message: "Permission denied"})
        }

        next();
    } catch (error) {
        console.error(error)
    }
}