import { useEffect, useState } from 'react';
import type { CatModel } from '../types';

export default function useCats() {
  const [cats, setCats] = useState<CatModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cats`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch cats');
        }
        return res.json();
      })
      .then((data: CatModel[]) => {
        setCats(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { cats, loading, error };
}
