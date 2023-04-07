import clsx from "clsx";
import { FormEventHandler, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiMinusCircle, FiPlus } from "react-icons/fi";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";
import Divider from "../components/Divider";
import FormField from "../components/FormField";
import ShippingListItem from "../components/ShippingListItem";
import SideBar from "../components/SideBar";
import { Shipment } from "../shipment.interface";
import { useShipmentsStorage } from "../use-shipments.storage";

interface HomeProps {
  tracks?: [];
}

function Home({ tracks = [] }: HomeProps) {
  const [selected, setSelected] = useState<Shipment | null>(null);
  const [text, setText] = useState<string>("");
  const [shipments, setShipments] = useShipmentsStorage(tracks);
  const [showSideBar, setShowSideBar] = useState(true);

  const deleteShipment = () => {
    alert("deleting...");

    // if (selected) {
    //   setShipments((items) =>
    //     items?.filter((item) => item.trackingNumber !== selected.trackingNumber)
    //   );

    //   setSelected(shipments?.[0] ?? null);
    // }
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    // TODO: usar um modal legal pra isso
    if (shipments.find((t) => t.trackingNumber === text)) {
      alert("Tracking number already exists");
      return;
    }

    if (!text) {
      alert("Empty tracking number");
      return;
    }

    setShipments((items) =>
      items?.concat({
        trackingNumber: text,
        destination: "Paris",
        origin: "Brasil",
      })
    );

    setText("");
  };

  const selectItem = (shipment: Shipment) => {
    if (selected?.trackingNumber === shipment.trackingNumber) {
      setSelected(null);
      return;
    }

    setSelected(shipment);
  };

  return (
    <>
      <SideBar showSideBar={showSideBar}>
        <div className="px-6 mt-10 flex flex-col gap-6">
          <FormField
            placeholder="Search"
            leftAdornment={<BiSearch />}
          ></FormField>
          <div>
            {shipments?.map((shipment, index) => (
              <div className="flex flex-col" key={shipment.trackingNumber}>
                <ShippingListItem
                  description="Speaker B&O"
                  selected={
                    shipment.trackingNumber === selected?.trackingNumber
                  }
                  trackingNumber={shipment.trackingNumber}
                  onClick={() => selectItem(shipment)}
                />
                {<Divider />}
              </div>
            ))}
          </div>
        </div>
        <div className="py-3 px-8 border-t shadow-md border-t-gray-200">
          <button className="flex gap-1 items-center text-sm text-slate-500 font-light">
            <FiPlus></FiPlus>
            Add Shipment
          </button>
        </div>
      </SideBar>

      <div
        className={clsx(
          "bg-neutral-100 flex flex-col justify-between shadow-inner flex-grow"
        )}
      >
        <div className="p-6">
          <h1 className="text-center text-xl font-bold">
            {selected?.trackingNumber}
          </h1>
        </div>

        <div className="py-3 px-8 flex justify-center gap-12 border-t shadow-md border-t-slate-200 text-xl">
          <button onClick={() => setShowSideBar(!showSideBar)}>
            {showSideBar ? (
              <TbLayoutSidebarLeftCollapse />
            ) : (
              <TbLayoutSidebarRightCollapse />
            )}
          </button>
          <button
            onClick={() => deleteShipment()}
            className="text-red-500 font-bold text-lg"
          >
            <FiMinusCircle />
          </button>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default Home;
