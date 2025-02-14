import React,{useEffect,useRef} from 'react'
import ThreeDModel from '../components/ThreeDModel'
// import Highlights from '../components/Highlights'

// import Spline from "@splinetool/react-spline";
import gsap from 'gsap'
import emblem from '../assets/image.png'


export default function Home() {
  const boxRef = useRef(null);
  const boxRef1 = useRef(null);
  const boxRef2 = useRef(null);
  const boxRef3 = useRef(null);
  const boxRef4 = useRef(null);

  // useEffect(() => {
  //   gsap.fromTo(
  //     boxRef.current, 
  //     { opacity: 0, x: -300 }, 
  //     { opacity: 1, x: 0, duration: 1.5, ease: "power2.out" }
  //   );

  //   gsap.fromTo(
  //     boxRef1.current, 
  //     { opacity: 0, y: -100 }, 
  //     { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
  //   );
  //   gsap.fromTo(
  //     boxRef2.current, 
  //     { opacity: 0, x: 300 }, 
  //     { opacity: 1, x: 0, duration: 1.5, ease: "power2.out" }
  //   );

  //   gsap.fromTo(
  //     boxRef3.current, 
  //     { opacity: 0, }, 
  //     { opacity: 1,  duration: 1.5, ease: "power2.out" }
  //   );
  // }, []);

  return (
    <div>
        <ThreeDModel/>
        {/* <Highlights/> */}
        

        <div className="px-[7vw] flex items-center translate-y-20">
          <img src={emblem} alt="" className='' ref={boxRef}/>
          <div className=" flex flex-col items-center">
              <p className='text-8xl text-center' ref={boxRef1}><span className='text-orange-400'>Smart Policing</span> for a Safer </p>
              <span className='text-green-400 text-8xl text-center mt-7' ref={boxRef2}>Tomorrow</span>
              <p className='text-3xl mt-10 text-[#807d7d]' ref={boxRef3}>Bridging Justice and Technology, One Byte at a Time</p>
          </div>
        </div>
        {/* <button className='text-[#5f5f5f] text-center absolute bottom-[10vh] left-[50vw]' >Lodge Fir</button> */}

        {/* <div className="flex items-center -translate-y-[16vh]">
            <div className="translate-x-[10vw] flex flex-col items-center translate-y-[160px]">
              <p className='text-7xl text-center'>Smart, Secure, and Transparent <br /><span className='translate-y-7'>Blockchain for Legal Integrity</span></p>
              <p className='text-[#949393] translate-y-12 w-[90%] text-lg text-center'>With blockchain-based FIR filing, every report and case is secured with a unique, unchangeable digital signature. This system not only promotes transparency but also reduces delays and fraud, providing law enforcement agencies with a seamless way to manage sensitive case data securely.</p>
            </div>
            <div className="mt-[45vh] translate-x-[6vw] flex">
                {/* <Spline
                scene="https://prod.spline.design/S9iX7ImH4qDytcnt/scene.splinecode" 
                width={1200}
                height={1200}
                ref={boxRef4}
              /> */}
            {/* </div> */}
        {/* </div>  */}
    </div>
  )
}