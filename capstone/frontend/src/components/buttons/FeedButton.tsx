import { useState } from "react";
import { Fish } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import useCredits from "../../hooks/useCredits";
import { useAdopter } from "../../hooks/useAdopter";
import useCatDetails from "../../hooks/useCatDetails";
import CatFed from "../state/CatFed";

export default function FeedButton({ catId }: { catId: number }) {
  const { subtractCredits, balance, loading, refreshCredits } = useCredits();
  const { adopter } = useAdopter();
  const { getAccessTokenSilently } = useAuth0();
  const { cat } = useCatDetails(catId);
  const [isFeeding, setIsFeeding] = useState(false);
  const [showCatFedPopup, setShowCatFedPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recordFeedEvent = async (adopterId: number, catId: number) => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE },
      });

      const response = await fetch('http://localhost:3000/api/feeds/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          adopterId: adopterId,
          catId: catId,
          kibblesUsed: 1
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to record feed event');
      }

      console.log('Feed event recorded successfully');
    } catch (error) {
      console.error('Error recording feed event:', error);
      // Don't fail the feeding operation if recording fails
    }
  };

  const handleFeed = async () => {
    if (!adopter) {
      setErrorMessage("User profile not found. Please try logging in again.");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    if (balance.current_kibbles < 1) {
      setErrorMessage("You don't have enough kibbles to feed this cat!");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    setIsFeeding(true);
    setErrorMessage(null);

    try {
      // First deduct the credit
      await subtractCredits(1);
      
      // Then record the feeding event
      await recordFeedEvent(adopter.id, catId);
      
      // Refresh credits to ensure header updates
      refreshCredits();
      
      // Show success popup
      setShowCatFedPopup(true);
      // Auto-hide popup after 3 seconds
      setTimeout(() => setShowCatFedPopup(false), 3000);
    } catch (error) {
      console.error('Failed to feed cat:', error);
      setErrorMessage("Failed to feed cat. Please try again.");
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setIsFeeding(false);
    }
  };

  const hasEnoughCredits = balance.current_kibbles >= 1;
  const isDisabled = isFeeding || loading || !hasEnoughCredits;

  return (
    <div className="w-full relative">
      <button 
        onClick={handleFeed}
        disabled={isDisabled}
        className={`flex items-center justify-center w-full py-2 rounded-md font-semibold transition-colors ${
          isDisabled 
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
            : 'bg-orange-700 text-white hover:bg-orange-800'
        }`}
      >
        {isFeeding ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Feeding...
          </>
        ) : (
          <>
            <Fish size={18} className="mr-2" />
            Feed
          </>
        )}
      </button>
      
      {/* CatFed Popup */}
      {showCatFedPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-md mx-4">
            <CatFed catName={cat?.name} />
            <button
              onClick={() => setShowCatFedPopup(false)}
              className="mt-4 w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* Error Message */}
      {errorMessage && (
        <div className="text-xs mt-1 text-center px-2 py-1 rounded bg-red-100 text-red-700">
          {errorMessage}
        </div>
      )}
    </div>
  );
}