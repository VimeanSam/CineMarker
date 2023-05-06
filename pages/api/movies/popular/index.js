import { movies } from '../../../../popularMovies'

export default function handler(req, res) {
  res.status(200).json(movies)
}