import { useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiMinusCircle } from "react-icons/fi";
import { RiEditLine } from "react-icons/ri";
import FormField from "../components/FormField";
import { Details, SideBar } from "../components/Layout";
import List from "../components/List";
import ShippingListItem from "../components/ShippingListItem";
import { useShipmentsStorage } from "../hooks";
import { useShortcut } from "../hooks/use-shortcut";
import type { Shipment } from "../shipment.interface";

interface HomeProps {
  tracks?: [];
}

function Home({ tracks = [] }: HomeProps) {
  const [selected, setSelected] = useState<Shipment | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [shipments, setShipments] = useShipmentsStorage(tracks);
  const inputRef = useRef<HTMLInputElement>(null);

  useShortcut(
    () => {
      inputRef.current?.focus();
    },
    {
      shortcut: {
        code: "KeyF",
        metaKey: true,
      },
    }
  );

  const filterTracking = ({ trackingNumber, description }: Shipment) => {
    const searchByKeword = (term: string, field: string) =>
      new RegExp(term, "ig").test(field);

    return [
      searchByKeword(searchTerm, trackingNumber),
      searchByKeword(searchTerm, description ?? ""),
    ].some((v) => v);
  };

  const edit = () => {
    alert("not implemented yet");
  };

  const deleteShipment = () => {
    if (selected) {
      setShipments(
        (items) =>
          items?.filter(
            (item) => item.trackingNumber !== selected.trackingNumber
          ) ?? []
      );

      setSelected(null);
    }
  };

  const createTracking = ({ trackingNumber, description }: Shipment) => {
    // TODO: usar um modal legal pra isso
    if (shipments.find((t) => t.trackingNumber === trackingNumber)) {
      alert("Tracking number already exists");
      return;
    }

    if (!trackingNumber) {
      alert("Empty tracking number");
      return;
    }

    setShipments(
      (items) =>
        items?.concat({
          id: trackingNumber,
          trackingNumber,
          description,
          // startDate: new Date(),
        }) ?? []
    );
  };

  const selectItem = (shipment: Shipment) => {
    if (selected?.trackingNumber === shipment.trackingNumber) {
      setSelected(null);
      return;
    }

    setSelected(shipment);
  };

  // TODO: limpar form de modal quando fecha ele

  return (
    <>
      <SideBar onNewTracking={(e) => createTracking(e)}>
        <div className="px-6 mt-10 flex flex-col gap-6 h-full">
          <FormField
            placeholder="Search"
            value={searchTerm}
            ref={inputRef}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftAdornment={<BiSearch />}
            onClear={() => setSearchTerm("")}
          ></FormField>
          <List
            items={shipments.map((s) => ({ ...s, id: s.trackingNumber }))}
            filter={filterTracking}
            onSelect={selectItem}
          >
            {(shipment: Shipment) => (
              <ShippingListItem
                description={shipment.description}
                selected={shipment.trackingNumber === selected?.trackingNumber}
                trackingNumber={shipment.trackingNumber}
              />
            )}
          </List>
        </div>
      </SideBar>
      <Details
        renderActions={
          selected && (
            <>
              <button onClick={() => edit()} className="font-bold text-lg">
                <RiEditLine />
              </button>
              <button
                onClick={() => deleteShipment()}
                className="text-red-500 font-bold text-lg"
              >
                <FiMinusCircle />
              </button>
            </>
          )
        }
      >
        <div className="p-6">
          <h1 className="text-center text-xl font-bold">
            {selected?.trackingNumber}
          </h1>
        </div>
      </Details>
    </>
  );
}

export default Home;
