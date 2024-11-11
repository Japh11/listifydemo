import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setPage, handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
  const navigate = useNavigate();

  const loginAsUser = async () => {
    const success = await handleLogin('users', { email, password });
    if (success) {
      navigate('/Tasks'); // Redirect on successful login
    }
  };

  const loginAsAdmin = async () => {
    const success = await handleLogin('admins', { email, password });
    if (success) {
      navigate('/calendar'); // Redirect on successful login
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Login</h2>
      <input
        type="text"
        placeholder="Email"
        style={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div style={styles.passwordContainer}>
        <input
          type={showPassword ? 'text' : 'password'} // Toggle password visibility
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          style={styles.toggleButton}
          onClick={() => setShowPassword(!showPassword)} // Toggle show/hide
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={loginAsUser}>Login as User</button>
        <button style={styles.button} onClick={loginAsAdmin}>Login as Admin</button>
      </div>
      <div style={styles.registerContainer}>
        <button style={styles.secondaryButton} onClick={() => setPage('userRegister')}>User Register</button>
        <button style={styles.secondaryButton} onClick={() => setPage('adminRegister')}>Admin Register</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '300px',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    margin: '0 auto', // Center the container horizontally
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
  },
  passwordContainer: {
    position: 'relative',
  },
  toggleButton: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    border: 'none',
    background: 'none',
    color: '#007bff',
    cursor: 'pointer',
  },
  buttonContainer: {
    marginBottom: '20px',
  },
  button: {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  secondaryButton: {
    width: '48%',
    padding: '10px',
    margin: '5px 1%',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Login;
