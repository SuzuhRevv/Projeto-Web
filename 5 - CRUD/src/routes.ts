import express from 'express'
import userController from './userController';
const { getAllUsers, createUser, getUserById, updateUser, deleteUser, getUserByEmail, getUserByName } = userController;

const router = express.Router()


router.get('/', getAllUsers)
router.get('/email/:email', getUserByEmail);
router.get('/name/:name', getUserByName)
router.get('/id/:id', getUserById)
router.post('/', createUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)


export default router