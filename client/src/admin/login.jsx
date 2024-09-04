import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './admin.css';
import Navl from '../nav and fot/navlog';

const LoginSignUp = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const toggleActive = () => {
    setIsSignUpActive(!isSignUpActive);
    setEmail('');
    setPassword('');
    setUsername('');
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/signup', {
        username,
        email,
        password,
      });

      console.log('Signup successful:', response.data);
      navigate('/'); // Redirect to login page after successful signup
    } catch (error) {
      console.error('There was an error signing up:', error.response?.data?.message || error.message);
      alert('Signup failed. Please try again.');
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });

      if (response.data.status === 'success') {
        console.log('Login successful:', response.data);
        navigate('/home'); // Redirect to folder page after successful login
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('There was an error logging in:', error.response?.data?.message || error.message);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <>
      <Navl />
      <div className="login-signup">
        <div className={`container ${isSignUpActive ? 'active' : ''}`} id="container">
          <div className="form-container sign-up">
            <form onSubmit={handleSignUpSubmit}>
              <h1>Sign-up</h1>
              <br />
              <table>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" style={{ textAlign: 'center' }}>
                      <input type="submit" value="Submit" className="button" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
          <div className="form-container sign-in">
            <form onSubmit={handleLoginSubmit}>
              <h1>Log-In</h1>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="in"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="in"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <input type="submit" value="Enter" className="button" />
            </form>
          </div>

          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Welcome !!</h1>
                <p>Log in to an existing account</p>
                <button className="btn" onClick={toggleActive}>Log-in</button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Hello !!</h1>
                <p>Create a new account</p>
                <button className="btn" onClick={toggleActive}>Sign-up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignUp;
