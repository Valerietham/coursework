// Cat table stores all cat details
export interface CatModel {
  id: number;
  fosterer_id?: number | null;
  name?: string;
  gender?: 'female' | 'male' | 'unknown';
  age_in_months?: number | null;
  breed?: string | null;
  color?: string | null;
  temperament?: string | null;
  vaccinated?: boolean | null;
  sterilized?: boolean | null;
  dewormed?: boolean | null;
  microchipped?: boolean | null;
  photo_url?: string | null;
  description?: string | null;
  status?: 'active' | 'reserved' | 'adopted' | 'hidden';
  fosterer?: {
    id: number;
    name: string;
    contact_number?: string | null;
    email: string;
  } | null;
}

// Interests table stores either a like or a pass on a cat
export interface InterestWithCat {
  id: number;
  adopter_id: number;
  cat_id: number;
  adopter_action: 'like' | 'pass';
  created_at: string;
  cat: CatModel;
}

// Cat card component props
export interface CatCardProps {
  cat: CatModel | null | undefined;
  onLike: () => void;
  onPass: () => void;
}
