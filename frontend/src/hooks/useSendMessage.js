import React, { useState } from 'react'

function useSendMessage(id,message) {
    const [loading,setLoading] = useState(false)
    const sendMessage = async()=>{
        setLoading(true)
        try {
            const res = await fetch(`/api/messages/send/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({message})
              });
        const data = await res.json()
        console.log(data)
        
        } catch (error) {
            console.log('error sending the message')
        }finally{
            setLoading(false)
        }

    }
    return {loading,sendMessage}
 
}

export default useSendMessage
