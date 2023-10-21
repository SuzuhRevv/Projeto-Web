import { Request, Response } from "express";
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

const createUser = async (req: Request, res: Response) => {
    const { id, name, Email, Idade, Cidade, Estado }: Prisma.UserCreateInput = req.body;

    try {
        const createUser = await prisma.user.create({
            data: {
                id,
                name,
                Email,
                Idade,
                Cidade,
                Estado,
            }
            
        })
        res.status(201).json(createUser)
    } catch(error) {
        res.status(500).json({ error: "Falha na criação de usuário."  })
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users)
    } catch(error) {
        res.status(500).json({ error: "Falha ao buscar usuários." })
    }
} 

const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const user = await prisma.user.findUnique({ where: { id }})
        res.json(user)
    } catch(error) {
        res.status(500).json({ error: "Usuário não encontrado." })
    }
}

const getUserByEmail = async (req: Request, res: Response) => {
    const { email } = req.params
    try {
        const user = await prisma.user.findUnique({ where: { Email: email }})
        res.json(user)
    } catch(error) {
        res.json({ error: "Usuário não encontrado." })
    }
}

const getUserByName = async (req: Request, res: Response) => {
    const { name } = req.params
    try {
        const user = await prisma.user.findMany({where: { name }})
        res.json(user)
    } catch(error) {
        res.json({ error: "Usuário não encontrado." })
    }
}

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, Email, Idade, Cidade, Estado }: Prisma.UserCreateInput = req.body;
    try {
        const user = await prisma.user.update({
          where: {
            id
        },
          data: {
            id,
            name,
            Email,
            Idade,
            Cidade,
            Estado
        }
    });
    res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar o usuário" });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const User = await prisma.user.delete({
            where: { id }
        })
        res.status(200).json({ message: "Usuário deletado com sucesso." })
    } catch(error) {
        res.json({ error: "Erro ao deletar o usuário" })
    }
}




export default { createUser, getAllUsers, getUserById, getUserByEmail, getUserByName, updateUser, deleteUser }