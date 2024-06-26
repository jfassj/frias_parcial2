import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../styles/Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const [backgroundImage, setBackgroundImage] = useState('');

    useEffect(() => {
        const fetchBackgroundImage = async () => {
          try {
            const response = await axios.get('https://api.unsplash.com/photos/random', {
              params: { query: 'nature', client_id: 'vRGLx4UN82vCRsv2PdCfvNJHuGqvQaqK-l7ouY-oPPY' },
            });
            setBackgroundImage(response.data.urls.full);
          } catch (error) {
            console.error('Error fetching the background image:', error);
          }
        };
    
        fetchBackgroundImage();
      }, []);

    const handleLogin = async () => {
        try{
            const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            setMessage(`Login successful`);
            setMessageType('success');
        } catch (error){
            setMessage('Error logging in');
            setMessageType('error');
        }
    };


  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh' }}>
        <div className='login-container'>
        <h1>Login</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p className={messageType}>{message}</p>
        </div>
        
    </div>
    
  )
}

export default Login