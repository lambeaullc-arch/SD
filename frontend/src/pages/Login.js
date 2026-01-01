import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
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
          SoundDrops
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Your marketplace for premium music samples
        </p>
        <button
          onClick={handleLogin}
          className="btn-primary text-lg w-full py-4"
          data-testid="login-page-button"
        >
          🔑 Sign in with Google
        </button>
        <p className="text-sm text-gray-500 mt-6">
          Browse thousands of professional samples from top producers
        </p>
      </div>
    </div>
  );
};

export default Login;