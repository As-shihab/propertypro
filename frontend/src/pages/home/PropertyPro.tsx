import { useContext } from "react";
import GlobalFilter from "../../components/GlobalFilter/GlobalFilter";
import Card from "../../components/procard/Card";
import { GlobalContext } from "../../guard/GlobalContext";
export default function PropertyPro() {
 const {setGfilter} = useContext(GlobalContext)
   setGfilter(true);
  let arr = Array.from({length: 9} , (_, i)=>{i+1})

  return (
    <div>
      <GlobalFilter />

      {/* card view */}

      <div className="w-[98%] grid grid-cols-5 gap-4 m-auto mt-10">
        {
          arr.map(() => {
            return(
 <Card/>
            )
          })
        }
       
      </div>
      
    </div>
  );
}
