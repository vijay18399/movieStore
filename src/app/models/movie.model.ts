export interface Movie {
  _id: string;
  name: string;
  link: string;
  audience_rating: string;
  year?: number;
  runtime?: number;
  rating?: number;
  votes?: number;
  plot: string;
  poster: string;
  lq_poster: string;
  genres: string[];
  actors: string[];
  directors: string[];
  languages: string[];
}
