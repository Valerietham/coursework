// Credits table stores all kibbles credit details
export interface Credits {
  id: number;
  adopter_id: number;
  current_kibbles: number;
  total_purchased: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreditsBalance {
  current_kibbles: number;
  total_purchased: number;
}

// Credits context type
export interface CreditsContextType {
  credits: Credits | null;
  balance: CreditsBalance;
  loading: boolean;
  error: string | null;
  addCredits: (kibblesToAdd: number) => Promise<Credits>;
  subtractCredits: (kibblesToSubtract: number) => Promise<Credits>;
  refreshCredits: () => Promise<void>;
}
