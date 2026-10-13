import logo1 from '../assets/logo1.png'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {getCart} from '../services/cartService'
import {getUser} from '../services/user'
import { useNavigate } from 'react-router-dom';
export default function Navbar() {
    const navigate = useNavigate()
 const [cartItems, setCart]= useState(null)
 const [isopen, setOpen]= useState(false)
 const [userinfo, setUserInfo]=useState(null)
 useEffect(()=>{
    async function getICartItems() {
        const data  = await getCart()
       setCart(data)
    }
     getICartItems()
 },[])
  useEffect(()=>{
    async function getUsers() {
        const data  = await getUser()
        setUserInfo(data)
    }
     getUsers()
 },[])

 const cartquantity = cartItems?.cart?.items.length
   const handlelogout = ()=>{
     localStorage.clear()
     navigate('/')
   }
    return (
        <header className='fixed top-0 w-full z-50'>

            <div className="bg-[#005078] px-4 py-3">

                <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">

         
                    <div className="text-xl font-bold text-white">
                       <img src={logo1} alt="logo1" />  
                    </div>


                    <div className="flex items-center gap-4 text-sm text-white">
                        <Link to='/' className='font-bold hover:text-bg2'>Home</Link>
                        <Link to='/products' className='font-bold hover:text-bg2'>Products</Link>
                        <Link to='/orders' className='font-bold hover:text-bg2' >Orders</Link>
                        <Link to='/register' className="btnnav">
                             Sign in
                        </Link>

                        <Link to='/login' className="btnnav">
                            Login
                        </Link>

                        <Link to="/cart">
                            🛒<span className='bg-amber-300 rounded-full px-1 text-[9px]'>{cartquantity> 0 ? cartquantity: 0}</span> Cart
                        </Link>
                         <div onClick={()=>{setOpen((prev)=> !prev)
                         }}>
                            <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 -960 960 960" width="34px" fill="#e3e3e3"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm146.5-204.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm100-95.5q47-15.5 86-44.5-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160q53 0 100-15.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm-43-43Zm0 360Z"/></svg>
                         </div>
                    </div>

                </div>

            </div>
            
            { isopen &&  <div className='bg-bg1 text-white w-fit p-3 absolute right-0 rounded-2xl'>
                 <h3>{!userinfo ? "name" : `${userinfo.user.name}`}</h3>
                 <h4>{!userinfo ? "email" :  `${userinfo.user.email}`}</h4>
                 <div onClick={()=>{handlelogout();
                    setOpen((prev)=> !prev)}} className='text-red-500 cursor-pointer'>Logout</div>
              </div>
           }
        </header>
    );
}