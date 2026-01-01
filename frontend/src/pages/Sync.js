import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import WaveformPlayer from '../components/audio/WaveformPlayer';
import { samplesAPI } from '../utils/api';

const Sync = () => {
  const [syncPacks, setSyncPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncType, setSyncType] = useState('');
  const [selectedSample, setSelectedSample] = useState(null);

  const syncTypes = ['Sports', 'Film', 'Cinematic', 'Broadcast'];

  useEffect(() => {
    fetchSyncPacks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncType]);

  const fetchSyncPacks = async () => {
    try {
      setLoading(true);
      const params = { sync_ready_only: true };
      if (syncType) params.sync_type = syncType;
      const response = await samplesAPI.list(params);
      setSyncPacks(response.data);
    } catch (error) {
      console.error('Failed to fetch sync packs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full text-sm font-bold mb-4">
              BROADCAST QUALITY
            </div>
            <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Unbounded, sans-serif' }}>
              Sync-Ready Loops
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Premium loops curated for major sports, film, cinematic productions, and all broadcast applications
            </p>
          </div>

          {/* Info Banner */}
          <div className="glass-panel p-6 mb-8 bg-gradient-to-r from-violet-500/10 to-purple-600/10">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">🏆</div>
                <h3 className="font-bold mb-1">Sports</h3>
                <p className="text-sm text-gray-400">High-energy anthems</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🎬</div>
                <h3 className="font-bold mb-1">Film</h3>
                <p className="text-sm text-gray-400">Cinematic soundscapes</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🎭</div>
                <h3 className="font-bold mb-1">Cinematic</h3>
                <p className="text-sm text-gray-400">Epic orchestral</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📺</div>
                <h3 className="font-bold mb-1">Broadcast</h3>
                <p className="text-sm text-gray-400">TV & radio ready</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="glass-panel p-6 mb-8">
            <h3 className="font-bold mb-4">Filter by Type</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSyncType('')}
                className={`px-4 py-2 rounded-lg transition ${!syncType ? 'bg-violet-500 text-white' : 'bg-white/5 hover:bg-white/10'}`}
                data-testid="sync-type-all"
              >
                All Types
              </button>
              {syncTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSyncType(type)}
                  className={`px-4 py-2 rounded-lg transition ${syncType === type ? 'bg-violet-500 text-white' : 'bg-white/5 hover:bg-white/10'}`}
                  data-testid={`sync-type-${type.toLowerCase()}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Sync Packs Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {syncPacks.map((sample) => (
                <div key={sample.pack_id} className="glass-panel-hover p-6" data-testid="sync-pack-card">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 bg-gradient-to-r from-violet-500 to-purple-600 rounded text-xs font-bold mb-2">
                        SYNC READY
                      </span>
                      <h3 className="text-xl font-bold mb-1">{sample.title}</h3>
                      <p className="text-sm text-gray-400">by {sample.creator_name}</p>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4">{sample.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {sample.sync_type && (
                      <span className="px-2 py-1 bg-violet-500/20 rounded text-xs font-semibold">
                        {sample.sync_type}
                      </span>
                    )}
                    <span className="px-2 py-1 bg-white/10 rounded text-xs">{sample.category}</span>
                    {sample.bpm && (
                      <span className="px-2 py-1 bg-white/10 rounded text-xs">{sample.bpm} BPM</span>
                    )}
                    {sample.key && (
                      <span className="px-2 py-1 bg-white/10 rounded text-xs">Key: {sample.key}</span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedSample(sample)}
                    className="w-full btn-secondary mb-3"
                    data-testid="sync-preview-button"
                  >
                    🎧 Preview
                  </button>

                  {sample.is_free ? (
                    <button className="w-full btn-primary" data-testid="sync-download-free">
                      Download Free
                    </button>
                  ) : (
                    <button className="w-full btn-primary" data-testid="sync-purchase">
                      ${sample.price}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {syncPacks.length === 0 && !loading && (
            <div className="glass-panel p-12 text-center">
              <p className="text-xl text-gray-400">
                No sync-ready packs found. Check back soon for new additions!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {selectedSample && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedSample(null)}>
          <div className="max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="glass-panel p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block px-2 py-1 bg-gradient-to-r from-violet-500 to-purple-600 rounded text-xs font-bold mb-2">
                    SYNC READY - {selectedSample.sync_type}
                  </span>
                  <h2 className="text-2xl font-bold">{selectedSample.title}</h2>
                  <p className="text-gray-400">by {selectedSample.creator_name}</p>
                </div>
                <button onClick={() => setSelectedSample(null)} className="text-gray-400 hover:text-white text-2xl">
                  ×
                </button>
              </div>
              <WaveformPlayer
                audioUrl={`${process.env.REACT_APP_BACKEND_URL}${selectedSample.audio_file_path}`}
                packTitle={selectedSample.title}
              />
              {(selectedSample.bpm || selectedSample.key) && (
                <div className="mt-4 flex gap-4">
                  {selectedSample.bpm && (
                    <div>
                      <p className="text-sm text-gray-400">BPM</p>
                      <p className="text-xl font-bold">{selectedSample.bpm}</p>
                    </div>
                  )}
                  {selectedSample.key && (
                    <div>
                      <p className="text-sm text-gray-400">Key</p>
                      <p className="text-xl font-bold">{selectedSample.key}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sync;
