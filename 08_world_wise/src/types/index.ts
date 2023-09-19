export interface iCity {
  cityName: string;
  country: { country: string; emoji: string };
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: number;
}

export interface iUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
}
