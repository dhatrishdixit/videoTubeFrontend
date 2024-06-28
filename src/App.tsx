import { Navbar } from "./components/Header/header";
import { Outlet } from "react-router-dom";


function App() {
 
  return (
    <div>
      <div className="grid grid-rows-10 h-screen overflow-hidden w-screen">
        <div className="row-span-1">
           <Navbar/>
        </div>
      
        <Outlet/>
   
     </div>
  </div>
  );
}



export default App;
