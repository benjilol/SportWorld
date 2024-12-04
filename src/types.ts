export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Team {
  id?: string;
  name: string;
  country: string;
  achievements: string[];
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Player {
  id?: string;
  name: string;
  nationality: string;
  achievements: string[];
  imageUrl: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Comment {
  id?: string;
  content: string;
  author: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Sport {
  id?: string;
  name: string;
  description: string;
  history: string;
  imageUrl: string;
  rules: string[];
  topTeams: Team[];
  topPlayers: Player[];
  comments?: Comment[];
  createdAt?: Date;
  updatedAt?: Date;
}
