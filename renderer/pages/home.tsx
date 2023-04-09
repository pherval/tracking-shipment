import { useRef } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { FiMinusCircle } from "react-icons/fi";
import { RiEditLine } from "react-icons/ri";
import { ButtonIcon } from "../components/Button";
import FormField from "../components/FormField";
import { Details, SideBar } from "../components/Layout";
import List from "../components/List";
import ShippingListItem from "../components/ShippingListItem";
import { useShipmentsStorage, useSelect, useShortcut } from "../hooks";
import type { Shipment } from "../shipment.interface";

function Home() {
  const [shipments, setShipments] = useShipmentsStorage();
  const {
    selected,
    select,
    deselect,
    isSelected,
    selectedIndex,
    selectPrevious,
    selectLast,
    selectNext,
    selectFirst,
  } = useSelect(shipments);
  const { register, watch, reset, setFocus } = useForm();
  const sideBarRef = useRef<HTMLDivElement>(null);

  const searchTerm = watch("searchTerm");

  useShortcut(() => setFocus("searchTerm"), {
    shortcut: { code: "KeyF", metaKey: true },
  });

  useShortcut(() => selected && edit(), {
    shortcut: { code: "KeyE", metaKey: true },
  });

  // FIXME
  useShortcut(
    () => isSelected() && deselect(),
    {
      shortcut: { code: "Escape" },
      useGlobal: false,
    },
    sideBarRef?.current
  );

  useShortcut(
    () => (isSelected() ? selectPrevious() : selectLast()),
    {
      shortcut: { code: "ArrowUp" },
      useGlobal: false,
    },
    sideBarRef?.current
  );

  useShortcut(
    () => (isSelected() ? selectNext() : selectFirst()),
    {
      shortcut: { code: "ArrowDown" },
      useGlobal: false,
    },
    sideBarRef?.current
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

      // TODO: think about it!
      setTimeout(() => {
        selectPrevious();
      }, 100);
    } else {
      alert("something is wrong!!!");
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

    setShipments((items) =>
      items.concat({
        id: trackingNumber,
        trackingNumber,
        description,
        // startDate: new Date(),
      })
    );

    // meh -> talvez tenha que juntar selected com setShipments
    setTimeout(() => {
      select((s) => s.id === trackingNumber);
    }, 100);
  };

  const selectItem = (item: Shipment) =>
    select((selected) => selected.trackingNumber === item.trackingNumber);

  return (
    <>
      <SideBar ref={sideBarRef} onNewTracking={(e) => createTracking(e)}>
        <div className="px-6 mt-10 flex flex-col gap-6 h-full">
          <FormField
            placeholder="Search"
            leftAdornment={<BiSearch />}
            onClear={() => reset()}
            {...register("searchTerm")}
          ></FormField>
          <List
            selectedIndex={selectedIndex}
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
          isSelected() && (
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
        {selected && (
          <div className="p-6">
            <h1 className="text-center text-xl font-bold">
              {selected.trackingNumber}
            </h1>
          </div>
        )}
      </Details>
    </>
  );
}

export default Home;
