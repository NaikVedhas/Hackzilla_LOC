import React,{useEffect,useRef} from 'react'
import ThreeDModel from '../components/ThreeDModel'
import emblem from '../assets/image.png'


export default function Home() {
  const boxRef = useRef(null);
  const boxRef1 = useRef(null);
  const boxRef2 = useRef(null);
  const boxRef3 = useRef(null);
  const boxRef4 = useRef(null);


  return (
    <div>
        <ThreeDModel/>
        <div className="px-[7vw] flex items-center translate-y-20">
          <img src={emblem} alt="" className='' ref={boxRef}/>
          <div className=" flex flex-col items-center">
              <p className='text-8xl text-center' ref={boxRef1}><span className='text-orange-400'>Smart Policing</span> for a Safer </p>
              <span className='text-green-400 text-8xl text-center mt-7' ref={boxRef2}>Tomorrow</span>
              <p className='text-3xl mt-10 text-[#807d7d]' ref={boxRef3}>Bridging Justice and Technology, One Byte at a Time</p>
          </div>
        </div>
    </div>
  )
}