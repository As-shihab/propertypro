import { useContext } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { GlobalContext } from "../guard/GlobalContext";
import { NavLink } from "react-router-dom";

export default function Header() {
  const context = useContext(GlobalContext)
  console.log(context)
  return (
    <header className=" border-b pb-3 border-slate-200  ">
<div className="flex items-center justify-around  list-none py-3 ">
    <h1>PropertyPro</h1>

<div className="flex gap-3">
    <li className="nav cursor-pointer"><NavLink to='/'>Stays</NavLink></li>
    <li className="nav cursor-pointer">Propertys</li>
</div>

<div className="flex items-center  gap-3">

<div className="flex items-center gap-2">
     <AiOutlineGlobal />
<span>Find your best</span>
</div>

    <div className="rounded-full flex cursor-pointer py-3 px-4 items-center gap-3 shadow-sm ">
<FaBarsStaggered />
<FaUserCircle className="text-2xl" />
    </div>
</div>
</div>

<div className="w-full text-center  text-slate-600">
 <div className="w-[60%] m-auto border p-2 px-5 border-slate-200 rounded-full">
<div className="grid grid-cols-3 gap-3">
  <div className="flex cursor-pointer flex-col">
    <span>Filter your location</span>
    <span className="text-xs">
        click to filter location
    </span>
  </div>

  <div className="flex cursor-pointer  gap-2">
<div className="flex flex-col gap-2">
       <div>Check In</div>
   <span className="text-xs">Select address</span>
</div>

<div className="flex flex-col gap-2">
       <div>Check Out</div>
   <span className="text-xs">Select address</span>
</div>
  </div>

  <div className="flex cursor-pointer flex-col">
    <span>Filter your location</span>
    <span className="text-xs">
        click to filter location
    </span>
  </div>
</div>
   </div> 
</div>
    </header>
  )
}
