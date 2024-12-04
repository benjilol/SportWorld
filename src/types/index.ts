export interface Sport {
  id?: string;
  name: string;
  description: string;
  history: string;
  imageUrl: string;
  rules: string[];
  topTeams: {
    name: string;
    country: string;
    achievements: string[];
    imageUrl: string;
  }[];
  topPlayers: {
    name: string;
    nationality: string;
    achievements: string[];
    imageUrl: string;
    active: boolean;
  }[];
  comments?: {
    id: string;
    content: string;
    author: string;
    createdAt: string;
  }[];
}

export interface Team {
  id: string;
  name: string;
  country: string;
  achievements: string[];
  imageUrl: string;
}

export interface Player {
  id: string;
  name: string;
  nationality: string;
  achievements: string[];
  imageUrl: string;
  active: boolean;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  sportId: string;
}