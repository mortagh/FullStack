import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, getUsersByRole, updateUser } from "../controllers/userController";

const router = express.Router();

//get
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/role/:role', getUsersByRole);

//post
router.post('/', createUser);

//put
router.put('/:id', updateUser);

//delete
router.delete('/:id', deleteUser);

export default router;