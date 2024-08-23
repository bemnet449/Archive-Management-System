import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./admin.css";
import Nav from "../nav and fot/navbar";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/login', {
                email,
                password,
            });

            if (response.data.status === 'success') {
                console.log('Login successful:', response.data);
                navigate('/folder');
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
        <Nav/>
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
        </div></>
    );
};

export default Login;
