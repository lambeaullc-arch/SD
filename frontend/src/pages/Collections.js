import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import { collectionsAPI } from '../utils/api';

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCollection, setNewCollection] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await collectionsAPI.list();
      setCollections(response.data);
    } catch (error) {
      console.error('Failed to fetch collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', newCollection.name);
      formData.append('description', newCollection.description);
      await collectionsAPI.create(formData);
      setShowCreateModal(false);
      setNewCollection({ name: '', description: '' });
      fetchCollections();
    } catch (error) {
      alert('Failed to create collection: ' + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold" style={{ fontFamily: 'Unbounded, sans-serif' }} data-testid="collections-title">
              📋 My Collections
            </h1>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
              data-testid="create-collection-button"
            >
              + New Collection
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
            </div>
          ) : collections.length === 0 ? (
            <div className="glass-panel p-12 text-center">
              <p className="text-gray-400 text-lg">No collections yet. Create your first one!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((collection) => (
                <div key={collection.collection_id} className="glass-panel-hover p-6" data-testid="collection-card">
                  <h3 className="text-xl font-bold mb-2">{collection.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{collection.description || 'No description'}</p>
                  <p className="text-sm text-gray-500">{collection.pack_ids.length} samples</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowCreateModal(false)}>
          <div className="max-w-md w-full glass-panel p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Create Collection</h2>
            <form onSubmit={handleCreate}>
              <input
                type="text"
                placeholder="Collection name"
                value={newCollection.name}
                onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-violet-500"
                required
                data-testid="collection-name-input"
              />
              <textarea
                placeholder="Description (optional)"
                value={newCollection.description}
                onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-violet-500 h-24"
                data-testid="collection-description-input"
              ></textarea>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 btn-primary" data-testid="submit-collection-button">
                  Create
                </button>
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collections;