import HeaderPostLogin from '../components/HeaderPostLogin'; // Header
import useCatDetails from '../hooks/useCatDetails'; // Fetch Individual Cat Data
import CatCard from '../components/CatCard'; // Cat Card Component
import Loading from '../components/state/Loading'; // Loading State
import Error from '../components/state/Error'; // Error State
import { useParams } from 'react-router-dom'; // For URL parameters

const CatDetails = () => {
  const { id } = useParams<{ id: string }>();
  const catId = id ? Number(id) : null;
  const { cat, loading, error } = useCatDetails(catId);

  return (
    <div className="bg-white">
      <HeaderPostLogin title="Meowww" />
      {loading && <Loading />}
      {error && <Error />}
      <div className="px-4">
        <CatCard cat={cat} onLike={() => {}} onPass={() => {}} />
      </div>
    </div>
  );
};

export default CatDetails;
