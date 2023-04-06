import { useState } from "react";
import Box from "../components/Box";
import FormField from "../components/FormField";
import ShippingListItem from "../components/ShippingListItem";
import { BsTrash } from "react-icons/bs";
import ShipmentStatus from "../components/ShipmentStatus";

interface Shipping {
  trackingNumber: string;
  destination: string;
  origin: string;
}

const tracks: Shipping[] = Array(2)
  .fill({})
  .map(() => ({
    // gen random number with 13 digits
    trackingNumber: "ABC" + Math.random().toString().slice(2, 11),
    destination: "Paris",
    origin: "Brasil",
  }));

interface HomeProps {
  tracks: Shipping[];
}

function Home({ tracks }: HomeProps) {
  const [tracking, setTracking] = useState<Shipping | null>(null);
  const [text, setText] = useState<string>("");
  const [trackings, setTrackings] = useState(tracks);

  const deleteShipment = () => {
    if (tracking) {
      setTrackings((items) =>
        items.filter((item) => item.trackingNumber !== tracking.trackingNumber)
      );

      setTracking(trackings?.[0] ?? null);
    }
  };

  const submit = (e) => {
    e.preventDefault();

    // TODO: usar um modal legal pra isso
    if (trackings.find((t) => t.trackingNumber === text)) {
      alert("Tracking number already exists");
      return;
    }

    if (!text) {
      alert("Empty tracking number");
      return;
    }

    setTrackings((items) =>
      items.concat({
        trackingNumber: text,
        destination: "Paris",
        origin: "Brasil",
      })
    );

    setText("");
  };

  const selectItem = (shipment: Shipping) => {
    setTracking(shipment);
  };

  return (
    <div className="container">
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
        {tracking && (
          <div className="p-7 bg-rose-200 rounded-3xl z-50">
            <div className="flex justify-between items-center  border-b pb-4 border-gry-300">
              <p className="flex flex-col gap-1">
                Tracking Number
                <span className="font-bold">{tracking?.trackingNumber}</span>
              </p>
              <ShipmentStatus />
            </div>
          </div>
        )}
        <div className="overflow-y-scroll shadow rounded-2xl -mt-10">
          <div className="p-4 flex flex-col gap-4 rounded-2xl mt-10">
            {trackings.map((track) => (
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
          {tracking && (
            <button onClick={() => deleteShipment()}>
              <BsTrash />
            </button>
          )}
        </div>
      </Box>
    </div>
  );
}

export const getStaticProps = () => {
  return {
    props: {
      tracks,
    },
  };
};

export default Home;
