import { useState } from 'react';
import { useAdopter } from '../../hooks/useAdopter';

const SERVER_URL = 'http://localhost:3000';

const DonateButton = () => {
  const [loading, setLoading] = useState(false);
  const { adopter } = useAdopter();

  const donate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${SERVER_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adopter?.email }),
      });
      const data = await res.json();
      console.log(data);
      if (data.url) window.location.href = data.url;
      else alert(data.error || 'Failed to create session');
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={donate}
      disabled={loading}
      className="bg-orange-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-900 transition-colors"
    >
      {loading ? 'Redirecting…' : 'Get Kibbles'}
    </button>
  );
};

export default DonateButton;
