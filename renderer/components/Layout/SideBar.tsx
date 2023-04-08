import { Variants, motion } from "framer-motion";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { MdOutlineDescription } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { useLayoutContext } from ".";
import { useShortcut } from "../../hooks";
import { Shipment } from "../../shipment.interface";
import Button from "../Button";
import FormField from "../FormField";
import { Modal, ModalContent } from "../modal";

interface ModalFormValues {
  trackingNumber: string;
  description: string;
}

interface SideBarProps {
  children: React.ReactNode;
  onNewTracking?: (value: Shipment) => void;
}

const variants: Variants = {
  open: {
    width: "initial",
    opacity: 1,
    x: 0,
  },
  closed: {
    width: 0,
    opacity: 0,
    x: "-100%",
  },
};
export default function SideBar({
  children,
  onNewTracking,
}: SideBarProps): JSX.Element | null {
  const { showSideBar } = useLayoutContext();
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, setFocus } = useForm<ModalFormValues>();

  // TODO: melhorar para outras plataformas e usar atalho local do electron
  useShortcut(() => setShowModal(true), {
    shortcut: { code: "KeyN", metaKey: true },
  });

  const submit: SubmitHandler<ModalFormValues> = ({
    trackingNumber,
    description,
  }) => {
    // TODO: melhorar validações
    if (!trackingNumber) {
      alert("Empty tracking number");
      return;
    }

    onNewTracking?.({
      id: trackingNumber,
      trackingNumber,
      description,
    });

    setShowModal(false);
  };

  return (
    <motion.div
      animate={showSideBar ? "open" : "closed"}
      variants={variants}
      className="flex flex-col justify-between shadow-inner"
    >
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onOpen={() => setFocus("trackingNumber")}
      >
        <ModalContent title="Add Tracking">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-2">
              <FormField
                placeholder="Tracking number"
                leftAdornment={<TbTruckDelivery />}
                {...register("trackingNumber", { required: true })}
              />
              <FormField
                placeholder="Description"
                leftAdornment={<MdOutlineDescription />}
                {...register("description")}
              />
            </div>
            <div className="flex gap-2 justify-space-around items-center">
              <Button theme="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button type="submit">Start Tracking</Button>
            </div>
          </form>
        </ModalContent>
      </Modal>

      {children}

      <div className="py-3 px-8 border-t shadow-md border-t-gray-200">
        <button
          className="flex gap-1 items-center text-sm text-slate-500 font-light"
          onClick={() => setShowModal(true)}
        >
          <FiPlus></FiPlus>
          Add Shipment
        </button>
      </div>
    </motion.div>
  );
}
