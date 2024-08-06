import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/authContext.jsx';

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullName, password, confirmPassword, gender, username }) => {
    if (!fullName || !password || !confirmPassword || !gender || !username) {
      toast.error('Please fill in all the fields correctly');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, password, confirmPassword, gender, username })
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
      console.error('Error signing up:', error);
      toast.error('Error signing up');
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignUp;


