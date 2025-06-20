
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { APP_NAME } from '../constants';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Added email state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username || !email || !password || !confirmPassword) { // Added email check
      setError('Username, email, password, and confirm password are required.');
      setLoading(false);
      return;
    }
    // Basic email format validation (optional, browser handles type="email")
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    const success = await register(username, email, password, referralCode); // Pass email to register
    setLoading(false);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Registration failed. Username might be taken or an error occurred.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/registerbg/1920/1080')"}}>
      <div className="glassmorphism p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-md space-y-4 animate-fadeInUpScale">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-sky-400 font-orbitron hover:text-sky-300 transition-colors duration-300 cursor-default">Join {APP_NAME}</h1>
          <p className="mt-2 text-sky-100">Start your mining journey today!</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-sky-200">Username</label>
            <input id="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 bg-slate-700 bg-opacity-50 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-white transition-all"
            placeholder="Choose a Username"/>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-sky-200">Email Address</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 bg-slate-700 bg-opacity-50 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-white transition-all"
            placeholder="Your Email Address"/>
          </div>

          <div>
            <label htmlFor="password"className="block text-sm font-medium text-sky-200">Password</label>
            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 bg-slate-700 bg-opacity-50 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-white transition-all"
            placeholder="Create a Password (min. 6 characters)"/>
          </div>

          <div>
            <label htmlFor="confirmPassword"className="block text-sm font-medium text-sky-200">Confirm Password</label>
            <input id="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-slate-700 bg-opacity-50 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-white transition-all"
            placeholder="Confirm Your Password"/>
          </div>

          <div>
            <label htmlFor="referralCode"className="block text-sm font-medium text-sky-200">Referral Code (Optional)</label>
            <input id="referralCode" type="text" value={referralCode} onChange={(e) => setReferralCode(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-slate-700 bg-opacity-50 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-white transition-all"
            placeholder="Enter Referral Code"/>
          </div>

          {error && <p className="text-sm text-red-400 bg-red-900 bg-opacity-50 p-2 rounded">{error}</p>}

          <div>
            <button type="submit" disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-slate-900 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
            >
              {loading ? 'Registering...' : 'Create Account'}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-sky-200">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-sky-400 hover:text-sky-300 transition-colors">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;