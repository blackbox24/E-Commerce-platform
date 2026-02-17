import { Router } from "express";
import {
    getAllUsers,
    getSingleUser,
    addUser,
    deleteUser,
    updateUser
} from "../controllers/user.controller.ts"
import authMiddleware from "../middleware/jwt.middleware.ts";
import { checkAdminRole } from "../middleware/permission.middleware.ts";


const router = Router();

router.get("/", authMiddleware, checkAdminRole,getAllUsers);
router.get("/:id", authMiddleware, checkAdminRole, getSingleUser);
router.post("/", authMiddleware, checkAdminRole,addUser);
router.put("/:id",authMiddleware, checkAdminRole,updateUser);
router.delete("/:id",authMiddleware, checkAdminRole,deleteUser);

export default router;