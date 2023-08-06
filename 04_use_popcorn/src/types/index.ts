export interface iMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface iWatchData extends iMovie {
  runtime: number;
  imdbRating: number;
  userRating: number;
}
