import { FormEventHandler, useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import Box from "../components/Box";
import FormField from "../components/FormField";
import ShipmentStatus from "../components/ShipmentStatus";
import ShippingListItem from "../components/ShippingListItem";
import { Shipment } from "../shipment.interface";
import { useShipmentsStorage } from "../use-shipments.storage";
import electron from "electron";
import path from "path";
import { getItem } from "../storage";
import { getShipments, saveShipments } from "../shipments.storage";

interface HomeProps {
  tracks?: [];
}

function Home({ tracks = [] }: HomeProps) {
  const [selected, setSelected] = useState<Shipment | null>(null);
  const [text, setText] = useState<string>("");
  const [shipments, setShipments] = useShipmentsStorage(tracks);

  const deleteShipment = () => {
    if (selected) {
      setShipments((items) =>
        items?.filter((item) => item.trackingNumber !== selected.trackingNumber)
      );

      setSelected(shipments?.[0] ?? null);
    }
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
    setSelected(shipment);
  };

  return (
    <>
      <Box className="bg-rose-300 p-5">
        <h1 className="text-lg font-bold text-gray-800">Add new package</h1>
        <h2>fill out the form and create a new package</h2>
        <form onSubmit={submit}>
          <FormField
            placeholder="Enter tracking number"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </form>
      </Box>

      <Box className="row-span-2 grid grid-rows-2 gap-0">
        <div className="p-7 bg-rose-200 rounded-3xl z-50">
          <div className="flex justify-between items-center  border-b pb-4 border-gry-300">
            <p className="flex flex-col gap-1">
              Tracking Number
              <span className="font-bold">{selected?.trackingNumber}</span>
            </p>
            <ShipmentStatus />
          </div>
        </div>
        <div className="overflow-y-scroll shadow rounded-2xl -mt-10">
          <div className="p-4 flex flex-col gap-4 rounded-2xl mt-10">
            {shipments.map((track) => (
              <ShippingListItem
                onClick={() => selectItem(track)}
                key={track.trackingNumber}
                trackingNumber={track.trackingNumber}
                destination={track.destination}
                origin={track.origin}
              />
            ))}
          </div>
        </div>
      </Box>

      <Box className="row-span-3 col-start-2 row-start-1 bg-slate-200">
        <div className="absolute right-10 top-10 text-xl">
          {selected && (
            <button onClick={() => deleteShipment()}>
              <BsTrash />
            </button>
          )}
        </div>
      </Box>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default Home;
