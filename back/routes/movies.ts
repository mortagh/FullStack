import express from "express";
import { MOVIES } from "../data/movies";
// get all movies
const router = express.Router();

router.get("/", (req, res) => {
  res.send(MOVIES);
});

// get movie with id
router.get("/:id", (req, res) => {
  const movie = MOVIES.find((m: any) => m.id === parseInt(req.params.id as string));
  if (!movie) {
    return res.status(404).send("Film non trouvé");
  }
  res.send(movie);
});

// post movie
router.post("/", (req, res) => {
  const { title, year, genre, rating } = req.body;

  //si film existe déjà
  const existingMovie = MOVIES.find(
    (m: any) => m.title === title && m.year === year,
  );
  if (existingMovie) {
    return res
      .status(400)
      .json({ error: "Un film avec ce titre et cette année existe déjà" });
  }

  if (!title || !year || !genre || !rating) {
    return res
      .status(400)
      .send("Veuillez fournir tous les champs obligatoires");
  }
  const movie = {
    id: MOVIES.length + 1,
    title,
    year,
    genre,
    rating,
  };
  MOVIES.push(movie);
  res.status(201).send(movie);
});

export default router;