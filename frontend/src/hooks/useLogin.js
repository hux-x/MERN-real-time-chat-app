import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/authContext.jsx';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ password, username }) => {
    if (!password || !username) {
      toast.error('Please fill in all the fields correctly');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, username })
      });

      const data = await res.json();
      console.log('Data received from backend:', data);

      // Ensure that the received data is an object
      if (typeof data === 'object') {
        localStorage.setItem("chat-user", JSON.stringify(data));
        setAuthUser(data);
      } else {
        console.error('Expected data to be an object, but got:', data);
      }

      return data;
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Error logging in');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
