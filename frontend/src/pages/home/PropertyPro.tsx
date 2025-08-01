import {  useState } from "react";
import GlobalFilter from "../../components/GlobalFilter/GlobalFilter";
import Card from "../../components/card/Card";
// import { GlobalContext } from "../../guard/GlobalContext";
// import { useScrollInfo } from "../../helpers/scrollWatcher";
import { useGeoLocation } from "../../helpers/geoLocation";
// import { httpClient } from "../../services/http";
export default function PropertyPro() {
  // const http = new httpClient();
  // const { setGfilter } = useContext(GlobalContext);
  // const [data, setData] = useState<any[]>([]);
  // const [skip, setSkip] = useState(0);
  const [limit] = useState(10); // items per fetch
  // const [hasMore, setHasMore] = useState(true);
  // const [loading, setLoading] = useState(false);
  // const { scrollY, scrollX,direction,isBottom,} = useScrollInfo();
  // const {ip} = useGeoLocation();

  console.log(useGeoLocation(), "use info");

  let arr = Array.from({ length: limit }, (_, i) => {
    i + 1;
  });

  return (
    <div>
      <GlobalFilter />

      {/* card view */}

      <div className="w-[98%] grid xl:grid-cols-3 2xl:grid-cols-5 gap-2 m-auto mt-10">
        {arr.map(() => {
          return <Card />;
        })}
      </div>
    </div>
  );
}
