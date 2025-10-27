
export interface Review {
  id: number;
  user: User;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: number;
  name: string;
  avatarUrl: string;
}

export interface Activity {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
  reviews: Review[];
}
