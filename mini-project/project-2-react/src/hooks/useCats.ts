import { useEffect, useState } from 'react';

interface CatBreed {
  id: string;
  name: string;
  temperament?: string;
  origin?: string;
}

interface Cat {
  id: string;
  url: string;
  breeds: CatBreed[];
}

export default function useCats() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetch(
      'https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10',
      {
        headers: {
          'x-api-key': apiKey || '',
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch cats');
        }
        return res.json();
      })
      .then((data: Cat[]) => {
        setCats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiKey]);

  return { cats, loading, error };
}
