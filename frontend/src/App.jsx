import './App.css'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import toast, { Toaster } from "react-hot-toast";   
import { createBrowserRouter,Route,createRoutesFromElements,RouterProvider, Navigate } from "react-router"
import FirForm from "./components/FirForm";
import NotFound from "./pages/NotFound";


function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route path='/filecase' element={<FirForm/>} />
        <Route path='/geoservices' element={<GeoServices/>} />
        <Route path='/analytics' element={<Analytics/>} />

        <Route path='*' element={<NotFound/>} />
        
      </Route>
    )
  )
  
  return (
   <>
    <RouterProvider router={router}/>
    <Toaster />
   </>
  )
}

export default App
