
import b1 from '../assets/brand4.png'
import b2 from '../assets/brand5.png'
import b3 from '../assets/brand6.png'
import b4 from '../assets/brand7.png'
import b5 from '../assets/brand8.png'

export default function BrandStrip() {
    const brands =[
        {id:1,
          image:b1
        },
         {id:2,
          image:b2
        },
         {id:3,
          image:b3
        },
         {id:4,
          image:b4
        },
         {id:5,
          image:b5
        }
    ]
  return (
    <>
     <div className='flex justify-between bg-bg3 items-center p-4 mx-4 rounded-2xl'>
        {
            brands.map((img)=> <div key={img.id} ><img src={img.image} alt="" width={150} /></div>)
        }
     </div>
    </>
  )
}
