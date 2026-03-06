import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";

// GET : Tous les utilisateurs + Pagination ET Recherche
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 2;
    const search = req.query.search as string;

    const skip = (page - 1) * limit;

    const filter: any = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const totalCount = await User.countDocuments(filter);

    const users = await User.find(filter).skip(skip).limit(limit);

    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      page,
      limit,
      totalCount,
      totalPages,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// GET : Un seul utilisateur
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// GET : Par rôle
export const getUsersByRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find({ role: req.params.role });
    if (users.length === 0)
      return res
        .status(404)
        .json({ error: "Aucun utilisateur trouvé avec ce rôle" });

    res.json(users);
  } catch (error) {
    next(error);
  }
};

// POST : Créer un utilisateur
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "Un utilisateur avec cet email existe déjà" });
    }
    next(error);
  }
};

// PUT : Mettre à jour
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json(user);
  } catch (error: any) {
    next(error);
  }
};

// DELETE : Supprimer
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    res.json({ message: `Utilisateur ${user.name} supprimé avec succès` });
  } catch (error) {
    next(error);
  }
};
