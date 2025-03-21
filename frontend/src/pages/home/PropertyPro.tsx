import GlobalFilter from "../../components/GlobalFilter/GlobalFilter";
import Card from "../../components/procard/Card";
import { Common } from "../../services/commonservice";
const services = new Common();
export default function PropertyPro() {
  return (
    <div>
      <GlobalFilter />

      {/* card view */}

      <div className="w-[98%] m-auto">
        <Card itemperpage={services.CardPerPage} />
      </div>
    </div>
  );
}
