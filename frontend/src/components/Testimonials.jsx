
import crown from '../assets/crown.png'
import security from '../assets/shield-security.png'
export default function Testimonials() {
  return (
    <>
       <div className='flex justify-center p-4 '>
         <div className='grid grid-cols-1 bg-bg3 gap-x-12 w-full pl-3  md:grid-cols-3 rounded-2xl'>
              <div className='flex gap-2 items-center'>
                <div>
                    <img src={security} alt="" />
                </div>
                <div>
                    <p className='text-bg1 font-bold'>Free delivery</p>
                    <p className='text-xs text-bg1'>on order above 5000 FRANC</p>
                </div>
              </div>
              <div className='flex gap-2 items-center'>
                <div>
                    <img src={crown} alt="" />
                </div>
                <div>
                    <p className='text-bg1 font-bold'>Best quality</p>
                    <p className='text-xs text-bg1'>best quality</p>
                </div>
              </div>
              <div className='flex gap-2 items-center'>
                <div>
                    <img src={security} alt="" />
                </div>
                <div>
                    <p className='text-bg1 font-bold'>1 year warranty</p>
                    <p className='text-xs text-bg1'> Available warranty</p>
                </div>
              </div>
         </div>
         </div>
    </>
  )
}
