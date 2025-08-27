// Fosterer-related types used throughout the application

export interface Fosterer {
  id: number;
  auth0_user_id: string;
  name: string;
  email: string;
  contact_number?: string | null;
  shelter_affiliation?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Fosterer with cats relationship
export interface FostererWithCats extends Fosterer {
  cats: Array<{
    id: number;
    name: string;
    photo_url?: string | null;
    status: string;
  }>;
}

// Fosterer contact info for cat cards
export interface FostererContact {
  id: number;
  name: string;
  contact_number?: string | null;
  email: string;
}
