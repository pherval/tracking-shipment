import clsx from "clsx";
import { FormEventHandler, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiMinusCircle, FiPlus } from "react-icons/fi";
import { MdOutlineDescription } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
  TbTruckDelivery,
} from "react-icons/tb";
import Button from "../components/Button";
import FormField from "../components/FormField";
import List from "../components/List";
import Modal, { ModalContent } from "../components/Modal";
import ShippingListItem from "../components/ShippingListItem";
import SideBar from "../components/SideBar";
import { useShipmentsStorage } from "../hooks";
import { useShortcut } from "../hooks/use-shortcut";
import { Shipment } from "../shipment.interface";

interface HomeProps {
  tracks?: [];
}

function Home({ tracks = [] }: HomeProps) {
  const [selected, setSelected] = useState<Shipment | null>(null);
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [shipments, setShipments] = useShipmentsStorage(tracks);
  const [showSideBar, setShowSideBar] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLInputElement>(null);

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

  // TODO: melhorar para outras plataformas e usar atalho local do electron
  useShortcut(
    () => {
      setShowModal(true);
      modalRef.current?.focus();
    },
    {
      shortcut: {
        code: "KeyN",
        metaKey: true,
      },
    }
  );

  const filterTracking = (s: Shipment) =>
    searchByKeword(searchTerm, s.trackingNumber) ||
    searchByKeword(searchTerm, s.description ?? "");

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

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

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

    setTrackingNumber("");
    setDescription("");
    setShowModal(false);
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
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ModalContent title="Add Tracking">
          <form className="flex flex-col gap-2" onSubmit={submit}>
            <FormField
              placeholder="Tracking number"
              leftAdornment={<TbTruckDelivery />}
              value={trackingNumber}
              ref={modalRef}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
            <FormField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              leftAdornment={<MdOutlineDescription />}
            />
          </form>
          <div className="flex gap-2 justify-space-around items-center">
            <Button theme="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={submit}>Start Tracking</Button>
          </div>
        </ModalContent>
      </Modal>

      <SideBar open={showSideBar}>
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
        <div className="py-3 px-8 border-t shadow-md border-t-gray-200">
          <button
            className="flex gap-1 items-center text-sm text-slate-500 font-light"
            onClick={() => setShowModal(true)}
          >
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
          {selected && (
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
          )}
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

const searchByKeword = (term: string, field: string) =>
  new RegExp(term, "ig").test(field);

export default Home;
