// User-related types used throughout the application

export interface Adopter {
  id: number;
  email: string;
  name: string;
  picture_url?: string | null;
  createdAt: string;
  updatedAt: string;
}
