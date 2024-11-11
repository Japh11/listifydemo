import React, { useState } from 'react';

const AdminRegister = ({ setPage, registerUser }) => {
  const [adminID, setAdminID] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Admin Register</h2>
      <input type="text" placeholder="Admin ID" style={styles.input} value={adminID} onChange={(e) => setAdminID(e.target.value)} />
      <input type="email" placeholder="Email" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" style={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
      <button style={styles.button} onClick={() => registerUser('admins', { adminID, email, password })}>Register</button>
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
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#ffc107',
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

export default AdminRegister;
