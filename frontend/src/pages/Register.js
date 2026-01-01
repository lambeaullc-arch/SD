import { useNavigate } from 'react-router-dom';

const Register = () => {
  const handleRegister = () => {
    // Store as free registration
    localStorage.setItem('registration_type', 'free');
    
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + '/auth/callback';
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl">
            <span className="text-5xl">🆓</span>
          </div>
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Unbounded, sans-serif' }}>
            Free Registration
          </h1>
          <p className="text-xl text-gray-400">
            Create your free account and start downloading samples
          </p>
        </div>

        <div className="glass-panel p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6 text-center">What's Included:</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5">
              <span className="text-3xl">✓</span>
              <div>
                <h3 className="font-bold text-lg mb-1">Free Sample Packs</h3>
                <p className="text-gray-400">Download all packs marked as free - no payment required</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5">
              <span className="text-3xl">✓</span>
              <div>
                <h3 className="font-bold text-lg mb-1">Favorites & Collections</h3>
                <p className="text-gray-400">Save your favorite samples and organize them into custom collections</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5">
              <span className="text-3xl">✓</span>
              <div>
                <h3 className="font-bold text-lg mb-1">Email Updates</h3>
                <p className="text-gray-400">Get notified about new releases and platform updates</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5">
              <span className="text-3xl">✓</span>
              <div>
                <h3 className="font-bold text-lg mb-1">Waveform Preview</h3>
                <p className="text-gray-400">Preview all samples with our audio player before downloading</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5">
              <span className="text-3xl">✓</span>
              <div>
                <h3 className="font-bold text-lg mb-1">Individual Purchases</h3>
                <p className="text-gray-400">Buy premium packs one at a time when you need them</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleRegister}
            className="btn-primary text-xl w-full py-4 mb-4"
            data-testid="register-free-button"
          >
            🆓 Register Free with Google
          </button>
          
          <p className="text-center text-gray-500 mb-4">
            No credit card required • Completely free forever
          </p>

          <div className="border-t border-white/10 pt-4">
            <p className="text-center text-sm text-gray-400">
              Want unlimited downloads? <a href="/subscribe" className="text-violet-400 hover:text-violet-300 underline">Check out our $5/month subscription</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
