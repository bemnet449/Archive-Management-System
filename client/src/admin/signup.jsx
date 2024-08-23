import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./admin.css";
import Nav from "../nav and fot/navbar";

function Signup() {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3000/signup', {
                username,
                email,
                password,
            });

            console.log('Signup successful:', response.data);

            // Redirect to login page after successful signup
            navigate('/');
        } catch (error) {
            console.error('There was an error signing up:', error.response.data.message || error.message);
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <>
        <Nav/>
        <div className="sign-up-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button><br/>
                <Link to="/">LOGIN</Link>
            </form>
        </div></>
    );
}

export default Signup;