import { useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useNavigate } from 'react-router-dom';

// TODO: Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAlHMp7BU2nEvg6BeRWbkmyI3GdhLbJo_c",
  authDomain: "angular-firebase-login-86769.firebaseapp.com",
  projectId: "angular-firebase-login-86769",
  storageBucket: "angular-firebase-login-86769.firebasestorage.app",
  messagingSenderId: "511413918437",
  appId: "1:511413918437:web:077f86a77383a70264920c",
  measurementId: "G-Y9WQ9YH00P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();



const LoginPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setSuccess(!!user);
      if (user) {
        // Optionally navigate('/');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      setSuccess(true);
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setSuccess(false);
    setUser(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center">
        {success && user ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-green-600">Logged in successfully!</h2>
            <div className="mb-4 flex flex-col items-center">
              <img src={user.photoURL} alt="User" className="w-16 h-16 rounded-full mb-2 border-2 border-blue-400" />
              <span className="font-semibold text-blue-700">{user.displayName}</span>
              <span className="text-gray-500 text-sm">{user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors font-semibold text-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-blue-700">Login</h2>
            {error && <div className="mb-2 text-red-600 font-semibold">{error}</div>}
            <form onSubmit={handleEmailLogin} className="w-full flex flex-col gap-4 mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
              <button
                type="submit"
                className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold text-lg"
              >
                Login
              </button>
            </form>
            <div className="mb-2 text-gray-500">or</div>
            <button
              onClick={handleGoogleLogin}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold text-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.36 30.18 0 24 0 14.82 0 6.73 5.48 2.69 13.44l7.98 6.2C12.13 13.13 17.62 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.04l7.18 5.59C43.98 37.13 46.1 31.3 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.24A14.5 14.5 0 019.5 24c0-1.48.25-2.91.7-4.24l-7.98-6.2A23.93 23.93 0 000 24c0 3.77.9 7.34 2.49 10.44l8.18-6.2z"/><path fill="#EA4335" d="M24 48c6.18 0 11.36-2.05 15.14-5.57l-7.18-5.59c-2 1.36-4.56 2.16-7.96 2.16-6.38 0-11.87-3.63-14.33-8.94l-8.18 6.2C6.73 42.52 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
              Sign in with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
