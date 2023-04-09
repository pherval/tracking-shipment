import { Variants, motion } from "framer-motion";
import { forwardRef, useState } from "react";
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
export default forwardRef<HTMLDivElement, SideBarProps>(function SideBar(
  { children, onNewTracking },
  ref
): JSX.Element | null {
  const { showSideBar, setShowSideBar } = useLayoutContext();
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, setFocus, reset } =
    useForm<ModalFormValues>();

  // TODO: melhorar para outras plataformas e usar atalho local do electron
  useShortcut(() => setShowModal(true), {
    shortcut: { code: "KeyN", metaKey: true },
  });

  useShortcut(() => !showSideBar && setShowSideBar(true), {
    shortcut: { metaKey: true, code: "ArrowRight" },
  });

  useShortcut(() => showSideBar && setShowSideBar(false), {
    shortcut: { metaKey: true, code: "ArrowLeft" },
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

    reset();
    setShowModal(false);
  };

  return (
    <motion.div
      ref={ref}
      animate={showSideBar ? "open" : "closed"}
      variants={variants}
      className="flex flex-col justify-between shadow-inner dark:text-white"
    >
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onOpen={() => setFocus("trackingNumber")}
      >
        <ModalContent
          title="Add Tracking"
          renderActions={[
            <Button
              key="cancel"
              theme="secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>,
            <Button key="submit" type="submit" onClick={handleSubmit(submit)}>
              Start Tracking
            </Button>,
          ]}
        >
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
          </form>
        </ModalContent>
      </Modal>

      {children}

      <div className="py-3 px-8 border-t shadow-md border-t-gray-200 dark:border-t-gray-700">
        <button
          className="flex gap-2 items-center text-sm text-slate-500 dark:text-white font-medium"
          onClick={() => setShowModal(true)}
        >
          <FiPlus className="text-lg"></FiPlus>
          Add Shipment
        </button>
      </div>
    </motion.div>
  );
});
