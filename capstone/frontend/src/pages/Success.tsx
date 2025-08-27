import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Kibbles from '../assets/Kibbles.gif';
import Loading from '../components/state/Loading';
import Error from '../components/state/Error';
import useCredits from '../hooks/useCredits';
import HeaderPostLogin from '../components/HeaderPostLogin'; // Header

const SERVER_URL = 'http://localhost:3000';

// Define expected session structure from backend
interface StripeSession {
  id: string;
  customer_email: string;
  status: string;
  subscription?: string;
  amount_total?: number;
  currency?: string;
  payment_status?: string;
  metadata?: {
    kibbles_qty?: string;
  };
}

export default function Success() {
  const [session, setSession] = useState<StripeSession | null>(null);
  const [error, setError] = useState('');
  const [kibblesAdded, setKibblesAdded] = useState(false);
  const kibblesAddedRef = useRef(false);
  const { addCredits } = useCredits();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (!sessionId) return setError('Missing session_id');

    fetch(`${SERVER_URL}/api/checkout-session?session_id=${sessionId}`)
      .then((r) => r.json())
      .then(async (data) => {
        /* console.log('Stripe session response:', data);  */
        setSession(data);
        if (data.customer)
          localStorage.setItem('stripe_customer_id', data.customer);

        // Add kibbles to user's account if payment was successful
        if (data.payment_status === 'paid' && !kibblesAddedRef.current) {
          try {
            const kibblesQty = parseInt(data.metadata?.kibbles_qty || '5');
            await addCredits(kibblesQty);
            kibblesAddedRef.current = true;
            setKibblesAdded(true);
            console.log(
              `Successfully added ${kibblesQty} kibbles to user account`
            );
          } catch (err) {
            console.error('Failed to add kibbles to user account:', err);
            // Don't show error to user as the payment was successful
          }
        }
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []); // Remove addCredits and kibblesAdded from dependencies

  const kibblesQty = session?.metadata?.kibbles_qty || '5';

  return (
    <>
      <HeaderPostLogin title="Furever" />
      <div className="flex flex-col items-center justify-center h-full">
        <img src={Kibbles} alt="No kibbles" className="w-48 h-auto" />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Kibbles successfully purchased!
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Start using your kibbles to feed cats you like.
        </p>

        {/* Show confirmation that kibbles were added */}
        {kibblesAdded && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {kibblesQty} kibbles have been added to your account!
          </div>
        )}

        {session && (
          <div className="text-gray-800 mb-4">
            <div>
              Kibbles Purchased: <span className="font-mono">{kibblesQty}</span>
            </div>
            {session.subscription && (
              <div>
                Subscription:{' '}
                <span className="font-mono">{session.subscription}</span>
              </div>
            )}
            {session.amount_total && session.currency && (
              <div>
                Amount Paid:{' '}
                <span className="font-mono">
                  {(session.amount_total / 100).toFixed(2)}{' '}
                  {session.currency.toUpperCase()}
                </span>
              </div>
            )}
            {session.payment_status && (
              <div>
                Payment Status:{' '}
                <span className="font-mono">{session.payment_status}</span>
              </div>
            )}
          </div>
        )}
        <Link
          to="/likes"
          className="inline-flex justify-center rounded-xl bg-orange-800 px-5 py-3 font-medium text-white hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-800"
        >
          Start Feeding
        </Link>

        {error && <Error />}

        {!session && !error && <Loading />}
      </div>
    </>
  );
}
