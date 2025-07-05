import GlobalFilter from "../../components/GlobalFilter/GlobalFilter";
import Card from "../../components/procard/Card";
export default function PropertyPro() {

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
