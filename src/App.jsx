import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { useContext } from 'react'
import { AuthContext } from './Components/firebase config/Private'

function App() {

  const {loading} = useContext(AuthContext)
  if(loading){
    return <div>Loading</div>
  }
  return (
    <>
     <Navbar></Navbar>
     <Outlet></Outlet>
    </>
  )
}

export default App
