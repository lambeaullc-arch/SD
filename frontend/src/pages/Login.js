import { useNavigate } from 'react-router-dom';

const Login = () => {
  const handleLogin = () => {
    // Store as regular login (not registration)
    localStorage.removeItem('registration_type');
    
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + '/auth/callback';
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl">
          <span className="text-5xl">🎵</span>
        </div>
        
        <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Unbounded, sans-serif' }}>
          Welcome Back
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Sign in to your SoundDrops account
        </p>

        <div className="glass-panel p-8">
          <button
            onClick={handleLogin}
            className="btn-primary text-xl w-full py-4 mb-6"
            data-testid="login-button"
          >
            🔑 Sign In with Google
          </button>

          <div className="border-t border-white/10 pt-6">
            <p className="text-gray-400 mb-4">Don't have an account?</p>
            <div className="space-y-3">
              <a 
                href="/register" 
                className="btn-secondary w-full text-center block py-3"
              >
                Register Free
              </a>
              <a 
                href="/subscribe" 
                className="btn-primary w-full text-center block py-3"
              >
                Subscribe ($5/month)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;