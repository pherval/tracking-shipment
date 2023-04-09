import { Variants, motion } from "framer-motion";
import { forwardRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { useLayoutContext } from ".";
import { useShortcut } from "../../hooks";
import { Shipment } from "../../shipment.interface";
import { Modal, ModalContent } from "../modal";
import TrackingForm, { ModalFormValues } from "../TrackingForm";

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

  useShortcut(() => setShowSideBar(!showSideBar), {
    shortcut: { metaKey: true, code: "Slash" },
  });

  const submit: SubmitHandler<ModalFormValues> = ({
    trackingNumber,
    description,
  }) => {
    // TODO: melhorar validações
    if (!trackingNumber) {
      throw new Error("Tracking number is required");
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
      ref={ref}
      animate={showSideBar ? "open" : "closed"}
      variants={variants}
      className="flex flex-col justify-between shadow-inner dark:text-white"
    >
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ModalContent title="Add Tracking">
          <TrackingForm
            onSubmit={submit}
            onCancel={() => setShowModal(false)}
          ></TrackingForm>
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
