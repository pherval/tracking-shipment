import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { FormEventHandler, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiMinusCircle, FiPlus } from "react-icons/fi";
import { MdOutlineDescription } from "react-icons/md";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
  TbTruckDelivery,
} from "react-icons/tb";
import Button from "../components/Button";
import Divider from "../components/Divider";
import FormField from "../components/FormField";
import Modal, { ModalContent } from "../components/Modal";
import ShippingListItem from "../components/ShippingListItem";
import SideBar from "../components/SideBar";
import { useShortcut } from "../hooks/use-shortcut";
import { Shipment } from "../shipment.interface";
import { useShipmentsStorage } from "../hooks";

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
    (e) => {
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

  const filteredShipments = shipments?.filter(
    (s) =>
      searchByKeword(searchTerm, s.trackingNumber) ||
      searchByKeword(searchTerm, s.description ?? "")
  );

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
          trackingNumber,
          description,
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

  // limpar modal quando fecha ele

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
          <AnimatePresence>
            {filteredShipments?.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { delay: shipments?.length * 0.15 },
                }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
                className="flex items-center justify-center grow"
              >
                no results
              </motion.div>
            ) : (
              filteredShipments?.map((shipment, index) => (
                <motion.div
                  variants={{
                    closed: {
                      x: -150,
                      opacity: 0,
                      transition: { duration: 0.1, delay: index * 0.15 },
                    },
                    open: { x: 0, opacity: 1 },
                  }}
                  initial="closed"
                  className="flex flex-col"
                  whileInView="open"
                  exit="closed"
                  key={shipment.trackingNumber}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <ShippingListItem
                    description={shipment.description}
                    selected={
                      shipment.trackingNumber === selected?.trackingNumber
                    }
                    trackingNumber={shipment.trackingNumber}
                    onClick={() => selectItem(shipment)}
                  />
                  {<Divider />}
                </motion.div>
              ))
            )}
          </AnimatePresence>
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
            <button
              onClick={() => deleteShipment()}
              className="text-red-500 font-bold text-lg"
            >
              <FiMinusCircle />
            </button>
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
