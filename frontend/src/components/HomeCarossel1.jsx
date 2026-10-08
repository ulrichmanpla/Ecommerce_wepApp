


import {products} from './productCarosselData'
export default function HomeCarossel1() {
  const [currentIndex, setCurrentIndex]=useState(0)
   const currentProducs =products[currentIndex]
    const handleNext = ()=>{
      setCurrentIndex((prevIndex)=>{
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
      })
    }
    const handlePrevious = ()=>{
      setCurrentIndex((prevIndex)=>{
        prevIndex === 0 ? products.length -1 : prevIndex - 1
      })
    }
  return (
    <>
      ffff
    </>
  )
}
