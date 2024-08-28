import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import axios from 'axios';

const API_LOGIN_URL = 'https://api.freeapi.app/users/login';
const API_SIGNUP_URL = 'https://api.freeapi.app/users/signup';

const loginUser = async (email, password) => {
    try {
        const response = await axios.post(API_LOGIN_URL, { email, password });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const signupUser = async (name, email, password) => {
    try {
        const response = await axios.post(API_SIGNUP_URL, { name, email, password });
        return response.data;
    } catch (error) {
        console.error('Error signing up:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const LoginForm = ({ onToggle, isLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(email, password);
            console.log('Login successful, data:', data);
            setError('');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="container">
            <h2 className="header">Login</h2>
            <form className="form" onSubmit={handleLogin}>
                <div className="input-container">
                    <FaEnvelope className="icon" />
                    <input
                        type="email"
                        placeholder="Email id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <FaLock className="icon" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Link to="/forgot-password" className="link">Lost password? <span className="link-highlight">Click here!</span></Link>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="button-container">
                    <button 
                        type="button" 
                        className={`button sign-up-button ${!isLogin ? 'active' : ''}`} 
                        onClick={onToggle}
                    >
                        Sign Up
                    </button>
                    <button 
                        type="submit" 
                        className={`button login-button ${isLogin ? 'active' : ''}`}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

const SignUpForm = ({ onToggle, isLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const data = await signupUser(name, email, password);
            console.log('Signup successful, data:', data);
            setError('');
        } catch (err) {
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2 className="header">Sign Up</h2>
            <form className="form" onSubmit={handleSignUp}>
                <div className="input-container">
                    <FaUser className="icon" />
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <FaEnvelope className="icon" />
                    <input
                        type="email"
                        placeholder="Email id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <FaLock className="icon" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="button-container">
                    <button 
                        type="submit" 
                        className={`button sign-up-button ${!isLogin ? 'active' : ''}`}
                    >
                        Sign Up
                    </button>
                    <button 
                        type="button" 
                        className={`button login-button ${isLogin ? 'active' : ''}`} 
                        onClick={onToggle}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = (e) => {
        e.preventDefault();
        // Implement API call to handle forgot password
        console.log('Forgot password for:', email);
        setMessage('If this email is registered, you will receive instructions to reset your password.');
    };

    return (
        <div className="container">
            <h2 className="header">Forgot Password</h2>
            <form className="form" onSubmit={handleForgotPassword}>
                <div className="input-container">
                    <FaEnvelope className="icon" />
                    <input
                        type="email"
                        placeholder="Email id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit" className="button login-button">
                    Reset Password
                </button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <Link to="/" className="link" style={{ marginTop: '20px', display: 'block' }}>
                <span className="link-highlight">Go Back</span>
            </Link>
        </div>
    );
};

const App = () => {
    const [isLogin, setIsLogin] = useState(false); // Show Sign-Up form by default

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={isLogin ? <LoginForm onToggle={toggleForm} isLogin={isLogin} /> : <SignUpForm onToggle={toggleForm} isLogin={isLogin} />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
