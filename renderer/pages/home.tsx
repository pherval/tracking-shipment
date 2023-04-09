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
import { ButtonIcon } from "../components/Button";
import { useForm } from "react-hook-form";

interface HomeProps {
  tracks?: [];
}

function Home({ tracks = [] }: HomeProps) {
  const [selected, setSelected] = useState<Shipment | null>(null);
  const [shipments, setShipments] = useShipmentsStorage(tracks);
  const { register, watch, reset, setFocus } = useForm();

  const searchTerm = watch("searchTerm");

  useShortcut(
    () => {
      setFocus("searchTerm");
    },
    {
      shortcut: {
        code: "KeyF",
        metaKey: true,
      },
    }
  );

  useShortcut(() => selected && edit(), {
    shortcut: {
      code: "KeyE",
      metaKey: true,
    },
  });

  useShortcut(() => selected && setSelected(null), {
    shortcut: {
      code: "Escape",
    },
  });

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
            leftAdornment={<BiSearch />}
            onClear={() => reset()}
            {...register("searchTerm")}
          ></FormField>
          <List
            selectedIndex={shipments.findIndex(
              (s) => s.trackingNumber === selected?.trackingNumber
            )}
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
              <ButtonIcon onClick={edit}>
                <RiEditLine />
              </ButtonIcon>
              <ButtonIcon theme="danger" onClick={deleteShipment}>
                <FiMinusCircle />
              </ButtonIcon>
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
