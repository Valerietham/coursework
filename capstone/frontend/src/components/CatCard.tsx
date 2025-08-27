import { useRef } from 'react';
import type { CatModel, CatCardProps } from '../types';
import NoMoreCats from './state/NoMoreCats';

const CatCard: React.FC<CatCardProps> = ({ cat, onLike, onPass }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!cat) {
    return <NoMoreCats />;
  }

  const scrollProgress = Math.min(scrollY / 200, 1);
  const imageTranslateY = -(scrollProgress * 100);
  const overlayOpacity = Math.max(0.3, 1 - scrollProgress * 0.7);

  return (
    <div
      ref={containerRef}
      className="w-full h-[95vh] rounded-lg overflow-y-auto scrollbar-hide bg-orange-900 shadow-2xl items-center"
      style={{ scrollBehavior: 'smooth' }}
    >
      <CatImageSection
        imageUrl={cat.photo_url || ''}
        catName={cat.name || 'Meow Meow'}
        subtitle={`${cat.breed || 'Unknown Breed'} • ${
          cat.age_in_months != null ? `${cat.age_in_months} months` : 'Age N/A'
        }`}
        imageTranslateY={imageTranslateY}
        overlayOpacity={overlayOpacity}
      />

      <CatDetailsSection cat={cat} onLike={onLike} onPass={onPass} />

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

// Image Section Component
interface CatImageSectionProps {
  imageUrl: string;
  catName: string;
  subtitle: string;
  imageTranslateY: number;
  overlayOpacity: number;
}

const CatImageSection: React.FC<CatImageSectionProps> = ({
  imageUrl,
  catName,
  subtitle,
  imageTranslateY,
  overlayOpacity,
}) => {
  return (
    <div className="relative h-[90vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: `translateY(${imageTranslateY}px)`,
          transformOrigin: 'center top',
        }}
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300"
        style={{ opacity: overlayOpacity }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">{catName}</h2>
        <p className="text-lg opacity-90 mb-4">{subtitle}</p>
        <div className="text-center opacity-70">
          <p className="text-sm">Scroll for more details</p>
          <div className="mt-2">↓</div>
        </div>
      </div>
    </div>
  );
};

// Details Section Component
interface CatDetailsSectionProps {
  cat: CatModel;
  onLike: () => void;
  onPass: () => void;
}

const CatDetailsSection: React.FC<CatDetailsSectionProps> = ({
  cat,
  onLike,
  onPass,
}) => {
  return (
    <div className="bg-white p-6 min-h-screen">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          About {cat.name || 'this cat'}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {cat.description ||
            'This beautiful cat is looking for a loving home!'}
        </p>
      </div>

      {cat.temperament && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            Personality
          </h4>
          <div className="flex flex-wrap gap-2">
            {cat.temperament.split(', ').map((trait, index) => (
              <span
                key={index}
                className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      )}

      <CatStats cat={cat} />

      <div className="flex gap-4 pt-6">
        <button
          onClick={onPass}
          className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
        >
          Pass
        </button>
        <button
          onClick={onLike}
          className="flex-1 bg-orange-500 text-white py-4 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
        >
          Like!
        </button>
      </div>
    </div>
  );
};

// Stats Component
interface CatStatsProps {
  cat: CatModel;
}

const CatStats: React.FC<CatStatsProps> = ({ cat }) => {
  const stats = [
    { label: 'Gender', value: cat.gender || 'Unknown' },
    {
      label: 'Age',
      value:
        cat.age_in_months != null ? `${cat.age_in_months} months` : 'Unknown',
    },
    { label: 'Breed', value: cat.breed || 'Unknown' },
    { label: 'Color', value: cat.color || 'Unknown' },
    { label: 'Vaccinated', value: cat.vaccinated ? 'Yes' : 'No' },
    { label: 'Sterilized', value: cat.sterilized ? 'Yes' : 'No' },
    { label: 'Dewormed', value: cat.dewormed ? 'Yes' : 'No' },
    { label: 'Microchipped', value: cat.microchipped ? 'Yes' : 'No' },
    { label: 'Status', value: cat.status || 'Unknown' },
  ];

  return (
    <div className="space-y-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex justify-between items-center py-2 border-b border-gray-100"
        >
          <span className="text-gray-600">{stat.label}</span>
          <span className="font-medium">{String(stat.value)}</span>
        </div>
      ))}
    </div>
  );
};

export default CatCard;
