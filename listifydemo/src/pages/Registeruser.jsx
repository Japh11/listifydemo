import React, { useState } from 'react';

const UserRegister = ({ setPage, registerUser }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>User Register</h2>
      <input
        type="text"
        placeholder="First Name"
        style={styles.input}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        style={styles.input}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
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
      <button
        style={styles.button}
        onClick={() => registerUser('users', { firstName, lastName, email, password })}
      >
        Register
      </button>
      <button style={styles.linkButton} onClick={() => setPage('login')}>Back to Login</button>
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
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#17a2b8',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default UserRegister;
