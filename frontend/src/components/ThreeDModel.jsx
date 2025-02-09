import Spline from "@splinetool/react-spline";
import gsap from 'gsap'

export default function ThreeDModel() {
  return (
    <div className="relative">
      {/* Spline Scene (Background Layer) */}
      

      {/* Blur Highlights (Topmost Layer) */}
      <div className="w-[250px] h-[250px] bg-[#f27cc8] rounded-full absolute -top-36 left-24 blur-[300px] z-50"></div>
      <div className="w-[300px] h-[300px] bg-[#491e54] rounded-full absolute top-56 right-24 blur-[150px] z-50"></div>
      <div className="w-[200px] h-[300px] bg-[#4966c5] rounded-full absolute -bottom-[80vh] left-[40vw] blur-[200px] z-50"></div>

      {/* Floating Box (Middle Layer) */}
      <div className="absolute w-[300px] h-[50px] bg-[#161618] bottom-3 right-0 z-10"></div>


    </div>
  );
}