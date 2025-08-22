import { useContext, useEffect, useState } from "react";
import GlobalFilter from "../../components/GlobalFilter/GlobalFilter";
import Card from "../../components/card/Card";
import LoadingGrid from "../../components/CardLoader/cardLoader";
import { httpClient } from "../../services/http";
import { GlobalContext } from "../../guard/GlobalContext";

export default function PropertyPro() {
  const [isProductLoading, setProductLoading] = useState(false);
  const { product, setProduct } = useContext(GlobalContext);
  const http = new httpClient();

  const fetchProducts = async () => {
    setProductLoading(true); // start loading
    try {
      const res = await http.get(`/api/product?$expand=medias&$filter=isComplete eq ${true}`);
      console.log(res.data, "data");
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setProductLoading(false); // stop loading
    }
  };

  useEffect(() => {
    if (!product || product.length === 0) {
      fetchProducts();
    }
  }, []);

  return (
<div className="w-full ">
  <GlobalFilter />

  {/* Card View */}
  {isProductLoading ? (
    <LoadingGrid />
  ) : product && product.product ? (
    <div className="grid 2xl:grid-cols-5 gap-7 md:grid-cols-2 xl:grid-cols-4  px-4 mt-3">
      {Object.values(product.product).map((item: any, idx: number) => (
        <Card key={idx} {...item} />
      ))}
    </div>
  ) : (
    <span className="block text-center text-gray-500 mt-10">No product found</span>
  )}
</div>



  );
}
