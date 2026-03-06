import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Error] ${err.name} : ${err.message}`);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  if (err.code === 11000) {
    return res.status(409).json({ error: "Conflit : Cet élément existe déjà (email en doublon)." });
  }

  return res.status(500).json({ error: "Erreur serveur interne" });
};