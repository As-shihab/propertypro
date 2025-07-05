import GlobalFilter from "../../components/GlobalFilter/GlobalFilter";
import Card from "../../components/procard/Card";
export default function PropertyPro() {

  let arr = Array.from({length: 9} , (_, i)=>{i+1})
  return (
    <div>
      <GlobalFilter />

      {/* card view */}

      <div className="w-[98%] grid gap-3 mt-4 grid-cols-4 m-auto">
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
