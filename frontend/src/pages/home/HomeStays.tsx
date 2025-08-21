import { useEffect, useState } from "react";
import GlobalFilter from "../../components/GlobalFilter/GlobalFilter";
import Card from "../../components/card/Card";
// import { GlobalContext } from "../../guard/GlobalContext";
// import { useScrollInfo } from "../../helpers/scrollWatcher";
// import { useGeoLocation } from "../../helpers/geoLocation";
import { httpClient } from "../../services/http";
export default function PropertyPro() {
  const http = new httpClient();
  const [product, setProduct] = useState([]);


  const fetchProducts = async () => {
    try {

      const response = await http.get("/odata/Products");
      setProduct(response.data.value);
    } catch (error) {
      console.error("Error fetching products:", error);

    }
  };


  useEffect(() => {

    if (!product) {
      fetchProducts();
    }


  }, [product]);
  return (
    <div>
      <GlobalFilter />

      {/* card view */}

      <div className="w-[98%] grid xl:grid-cols-3 2xl:grid-cols-5 gap-2 m-auto mt-10">
        {product.map(() => {
          return <Card />;
        })}
      </div>
    </div>
  );
}
