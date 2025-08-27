import HeaderPostLogin from '../components/HeaderPostLogin';
import SwipeCat from '../components/SwipeCat';

function Discover() {
  return (
    <div className="bg-white">
      <HeaderPostLogin title="Discover" />
      <div className="px-4 py-2">
        <SwipeCat />
      </div>
    </div>
  );
}

export default Discover;
