import Box from "../components/Box";
import FormField from "../components/FormField";
import { FaShippingFast } from "react-icons/fa";
import ShippingListItem from "../components/ShippingListItem";

function Home() {
  return (
    <div className="container">
      <Box className="bg-rose-300 p-5">
        <h1 className="text-lg font-bold text-gray-800">Add new package</h1>
        <h2>fill out the form and create a new package</h2>
        <FormField placeholder="Enter tracking number" />
      </Box>
      <Box className=" row-span-2 grid grid-rows-2">
        <div className="p-7 bg-rose-200 rounded-xl">
          <div>tracking number</div>
        </div>
        <div className="overflow-y-scroll p-4">
          <ShippingListItem
            trackingNumber="PRF0123123"
            destination="Paris"
            origin="Brasil"
          />
        </div>
      </Box>
      <Box className="row-span-3 col-start-2 row-start-1 bg-slate-500">
        right
      </Box>
    </div>
  );
}

export default Home;
