import './App.css'
import { Toaster } from "react-hot-toast";   
import { createBrowserRouter,Route,createRoutesFromElements,RouterProvider } from "react-router"
import FirForm from "./components/FirForm";
import NotFound from "./pages/NotFound";
import GeoServices from "./pages/GeoServices";
import Analytics from "./pages/Analytics";
import Layout from "./Layout"
import MyCases from './pages/MyCases';
import SearchDB from "./pages/SearchDB";
import Case from './pages/Case';
import Chatapp from './pages/Chatapp';
import ShiftListing from './pages/ShiftListiing';
import Home from "./pages/Home"
function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route path='' element={<Home/>} />
        <Route path='/filecase' element={<FirForm/>} />
        <Route path='/geoservices' element={<GeoServices/>} />
        <Route path='/analytics' element={<Analytics/>} />
        <Route path='/mycases' element={<MyCases/>} />
        <Route path='/case/:id' element={<Case/>} />
        <Route path='/database' element={<SearchDB/>} />
        <Route path='/chat' element={<Chatapp/>} />
        <Route path='/shift' element={<ShiftListing/>} />
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
