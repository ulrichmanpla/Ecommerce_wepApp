
import logo1 from '../assets/logo1.png'
export default function Navbar() {
  return (
    <>
      <div>
         <header className='bg-blue-950 px-4 py-2 flex justify-between'>
            <div>
                <img src={logo1} alt="" className='w-25' />
            </div>
            <nav>
                <ul className='text-white flex gap-10'>
                    <li>Signup</li>
                    <li>Login</li>
                </ul>
            </nav>
         </header>
      </div>
    </>
  )
}
