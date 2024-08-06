import './App.css'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import SignupPage from './pages/signup'
import { Routes, Route, Navigate } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { AuthContext, useAuthContext } from './context/authContext'
function App() {
  
const {authUser} = useAuthContext()
console.log(authUser)
  return (
    <>
    <Routes>
    <Route path="/" element={authUser?<HomePage/> : <Navigate to={'/signup'}/>}/>
    <Route path="/login" element={authUser?<Navigate to={'/'} /> : <LoginPage/>} />
    <Route path="/signup" element={authUser?<Navigate to={'/'}/> : <SignupPage/>} />
    </Routes>
    <Toaster/>
    
    </>
  )
}

export default App
