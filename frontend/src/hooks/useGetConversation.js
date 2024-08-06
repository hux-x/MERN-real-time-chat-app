import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

function useGetConversations() {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/users', { method: 'get', headers: { 'Content-Type': 'application/json' } });
                const data = await res.json();
                setConversations(data);
            } catch (error) {
                
                console.log('error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { loading, conversations };
}

export default useGetConversations;

