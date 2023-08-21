export interface iMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface iWatchedMovie extends iMovie {
  Runtime: string;
  imdbRating: string;
  userRating: string;
}

export interface iFetchedMovie extends iWatchedMovie {
  Rated: string;
  Released: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string; // string date
  BoxOffice: string; // "$133,378,256";
  Production: string;
  Website: string;
  Response: string; // boolean
}
