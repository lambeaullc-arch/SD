import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import { favoritesAPI } from '../utils/api';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await favoritesAPI.list();
      setFavorites(response.data);
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (packId) => {
    try {
      await favoritesAPI.remove(packId);
      setFavorites(favorites.filter(f => f.pack_id !== packId));
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: 'Unbounded, sans-serif' }} data-testid="favorites-title">
            ♥️ My Favorites
          </h1>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
            </div>
          ) : favorites.length === 0 ? (
            <div className="glass-panel p-12 text-center">
              <p className="text-gray-400 text-lg">No favorites yet. Start browsing and add some!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((sample) => (
                <div key={sample.pack_id} className="glass-panel-hover p-6" data-testid="favorite-card">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{sample.title}</h3>
                      <p className="text-sm text-gray-400">by {sample.creator_name}</p>
                    </div>
                    <button
                      onClick={() => handleRemove(sample.pack_id)}
                      className="text-red-500 hover:text-red-600 transition"
                      data-testid="remove-favorite-button"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{sample.description}</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-violet-500/20 rounded text-xs">{sample.category}</span>
                    {sample.is_free && <span className="px-2 py-1 bg-green-500/20 rounded text-xs">Free</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;