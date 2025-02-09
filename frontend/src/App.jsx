import './App.css'
import toast, { Toaster } from "react-hot-toast";   
import { createBrowserRouter,Route,createRoutesFromElements,RouterProvider, Navigate } from "react-router"
import FirForm from "./components/FirForm";
import NotFound from "./pages/NotFound";
import GeoServices from "./pages/GeoServices";
import Analytics from "./pages/Analytics";
import Layout from "./Layout"
import MyCases from './pages/MyCases';
import Case from './pages/Case';

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route path='/filecase' element={<FirForm/>} />
        <Route path='/geoservices' element={<GeoServices/>} />
        <Route path='/analytics' element={<Analytics/>} />
        <Route path='/mycases' element={<MyCases/>} />
        <Route path='/case/:id' element={<Case/>} />
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
