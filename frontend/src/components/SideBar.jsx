import React from 'react';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuthContext } from '../context/authContext';

const SideBar = () => {
  const {setAuthUser} = useAuthContext()
  const handleLogout = async()=>{
    const res = await fetch('/api/auth/logout',{
      method:"post",
      headers:{'Content-Type':"application/json"}
    })
    const data = await res.json()
    setAuthUser(null)
    localStorage.clear('chat-user')
    console.log(data)
  }
  return(
    <div className="flex flex-col items-center bg-[#71a0a5] w-16 py-4 shadow-lg rounded-lg h-full">
    <div className="flex flex-col items-center mt-auto space-y-4">
      <button className="text-[#eeeeee] hover:text-[#77628c] transition-colors duration-300 ease-in-out">
        <FaCog size={24} />
      </button>
      <button onClick={handleLogout} className="text-[#eeeeee] hover:text-[#77628c] transition-colors duration-300 ease-in-out">
        <FaSignOutAlt size={24} />
      </button>
    </div>
  </div>
  )
}
  

export default SideBar;



